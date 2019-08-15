import '../styles/app.less';
import '../styles/app.css';
import { UserGet, Logout } from '../actions/user';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { LocaleProvider, Menu, Modal } from 'antd';
import { Icon } from 'react-fa';
import enUS from 'antd/lib/locale-provider/en_US';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innerHeight: window.innerHeight > 500 ? window.innerHeight : 500,
      collapse: false,
      current: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.onCollapseChange = this.onCollapseChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { user } = nextProps;

    if (user.status < 0) {
      dispatch(Logout());
      browserHistory.push('/login');
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(UserGet());

  }

  handleClick(e) {
    const { dispatch } = this.props;

    if (e.key !== 'logout') {
      this.setState({
        current: e.key,
      });
    }

    switch (e.key) {

      case 'user':
        browserHistory.push('/user');
        break;
      case 'logout':
        Modal.confirm({
          title: 'Are you sure to logout ?',
          onOk: () => {
            dispatch(Logout());
            browserHistory.push('/login');
          },
          iconType: 'exclamation-circle',
        });
        break;
    }
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    const { innerHeight, collapse, current } = this.state;
    const { children } = this.props;

    return (
      <LocaleProvider locale={enUS}>
        <div className={collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside'}>
          <aside className="ant-layout-sider">
            {collapse ? '' : <div className="ant-layout-logo"></div>}
            <Menu theme="dark"
              onClick={this.handleClick}
              defaultOpenKeys={['dashboard']}
              selectedKeys={[current]}
              mode="inline"
            >

              <Menu.Item key="user">
                <Icon name="id-card-o" fixedWidth size={collapse ? '2x' : undefined} /><span className="nav-text">User</span>
              </Menu.Item>
              <Menu.Item key="docs">
                <a href="http://samaritan.stockdb.org" target='_blank'>
                  <Icon name="book" fixedWidth size={collapse ? '2x' : undefined} /><span className="nav-text">Docs</span>
                </a>
              </Menu.Item>
              <Menu.Item key="logout">
                <Icon name="power-off" fixedWidth size={collapse ? '2x' : undefined} /><span className="nav-text">Logout</span>
              </Menu.Item>
            </Menu>
            <div className="ant-aside-action" onClick={this.onCollapseChange}>
              {collapse ? <Icon name="chevron-right" /> : <Icon name="chevron-left" />}
            </div>
          </aside>
          <div className="ant-layout-main">
            <div className="ant-layout-container" style={{minHeight: innerHeight - 65}}>
              <div className="ant-layout-content">
                {children}
              </div>
            </div>
            <div className="ant-layout-footer">
              <a href="https://github.com/miaolz123/samaritan">Samaritan</a> © 2016
            </div>
          </div>
        </div>
      </LocaleProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
