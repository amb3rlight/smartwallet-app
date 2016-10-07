import Reflux from 'reflux'
import _ from 'lodash'
import ChatAgent from 'lib/agents/chat'

import Debug from 'lib/debug'
let debug = Debug('stores:conversation')

let chatAgent = new ChatAgent()

import ConversationActions from 'actions/conversation'
import ConversationsStore from 'stores/conversations'

import Utils from 'lib/util'

let {load, addMessage} = ConversationActions

export default Reflux.createStore({
  listenables: ConversationActions,

  state: {
    loading: true,
    items: []
  },

  getInitialState() {
    return this.state
  },
  cleanState() {
    this.state.loading = true
    this.state.items = []
    this.state.otherPerson = {}
  },

  onLoad(webId, id) {
    debug('onLoad with webId', webId, 'and id', id)

    ConversationsStore.getUri(webId, id).then((url) => {
      debug('Got conversation URI', url)
      return Promise.all([
        chatAgent.getConversation(url, webId),
        chatAgent.getConversationMessages(url)
      ]).then((result) => {
        let [conversation, items] = result
        load.completed(conversation, items)
      })
    }).catch((err) => {
      console.error('Couldn\'t get conversation URI', err)
    })
  },

  onLoadCompleted(conversation, items) {
    this.state = _.extend({
      loading: false,
      items: items
    }, conversation)

    this.trigger(this.state)
  },

  onSubscribe(webId, id) {
    ConversationsStore.getUri(webId, id).then((url) =>
      chatAgent.getConversation(url).then((conversation) => {
        // Chrome cancels WS connections when the server asks for a client cert
        // We first query the host so that the user is asked for a client cert
        // Chrome will then remember the choice during the WS connection and
        // will thus not cancel it
        new Promise((resolve, reject) => {
          if (Utils.isChrome()) {
            fetch(url, {
              method: 'HEAD',
              credentials: 'include'
            }).then(resolve)
          } else {
            resolve()
          }
        })
        .then(() => {
          this.socket = new WebSocket(conversation.updatesVia)
          this.socket.onopen = function () {
            this.send(`sub ${url}`)
          }
          this.socket.onmessage = function (msg) {
            if (msg.data && msg.data.slice(0, 3) === 'pub') {
              ConversationActions.load(webId, id)
            }
          }
        })
      })
    )
  },

  onAddMessage(uri, author, content) {
    return chatAgent.postMessage(uri, author, content)
      .then(() => {
        addMessage.completed({
          type: 'message',
          author: author,
          content: content
        })
      })
  },

  onAddMessageCompleted(item) {
    if (this.state.items) {
      this.state.items.push(item)
    } else {
      this.state.items = [item]
    }

    this.trigger(this.state)
  }

})
