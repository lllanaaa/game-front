import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import loadable from '../utils/loadable';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

// 以下是组件懒加载
const dynamicIndex = loadable(() => import('../components'));
const dynamic404 = loadable(() => import('../components/404'));
const dynamicGame = loadable(() => import('../components/game'));

class AllRoute extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={ dynamicIndex } />
                    <Route path='/game'  component={ dynamicGame } />
                    <Route path='*'  component={ dynamic404 } />
                </Switch>
            </Router>

        );
    }
}

export default AllRoute
