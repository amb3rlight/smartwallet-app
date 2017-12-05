import React from 'react'
import Radium from 'radium'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import {Tab, Tabs} from 'material-ui/Tabs'

import { Layout, Content } from 'components/layout'
import LeftNavToggle from 'components/left-nav/toggle'
import { connect } from 'redux_state/utils'
import { theme } from 'styles'

const STYLES = {
  colorBar: {
    backgroundColor: theme.jolocom.gray1,
    zIndex: '10',
    maxWidth: '1200px',
    width: '100%',
    margin: 'auto'
  },
  bar: {
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
    boxShadow: 'none'
  }
}

@connect({
  props: ['wallet.tabs.activeTab'],
  actions: ['wallet/tabs:detectActiveTab', 'wallet/tabs:switchTab']
})
@Radium
export default class WalletTabScreen extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
    activeTab: React.PropTypes.string,

    detectActiveTab: React.PropTypes.func.isRequired,
    switchTab: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.detectActiveTab({path: this.props.location.pathname})
  }

  componentDidUpdate() {
    this.props.detectActiveTab({path: this.props.location.pathname})
  }

  render() {
    console.log(Tab, 'TAB')
    console.log(Tabs, 'TABS')
    return (
      <Layout>
        <Paper style={STYLES.colorBar}>
          <AppBar
            title="SmartWallet"
            style={STYLES.bar}
            iconElementLeft={<LeftNavToggle />}
          />
          <Tabs style={STYLES.bar} value={this.props.activeTab}
            onChange={(tab) => this.props.switchTab({tab})}>
            <Tab label="Identity" value="identity" />
            <Tab label="Money" value="money" />
          </Tabs>
        </Paper>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}
