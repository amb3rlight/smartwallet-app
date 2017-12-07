import PropTypes from 'prop-types';
import React from 'react'
import {connect} from 'redux_state/utils'
import Presentation from '../presentation/ether-send'

@connect({
  props: ['wallet.money', 'wallet.money.ether.amount', 'wallet.etherTabs'],
  actions: [
    'wallet/money:buyEther',
    'wallet/money:goToWalletScreen',
    'wallet/ether-tabs:sendEther',
    'wallet/ether-tabs:updateField',
    'wallet/money:retrieveEtherBalance'
  ]
})
export default class EtherSendScreen extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    money: PropTypes.object.isRequired,
    amount: PropTypes.number.isRequired,
    updateField: PropTypes.func,
    etherTabs: PropTypes.object,
    sendEther: PropTypes.func,
    retrieveEtherBalance: PropTypes.func
  }

  componentWillMount() {
    this.props.retrieveEtherBalance()
  }

  updateField = (value, field) => {
    this.props.updateField({value, field})
  }

  render() {
    return (
      <div>
        <Presentation
          updateField={this.updateField}
          wallet={this.props.etherTabs.wallet}
          money={this.props.money}
          etherBalance={this.props.amount}
          sendEther={this.props.sendEther} />
      </div>
    )
  }
}
