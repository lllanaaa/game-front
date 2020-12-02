import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import loadable from '../utils/loadable';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

// 以下是组件懒加载
const dynamicIndex = loadable(() => import('../containers/index'));
const dynamic404 = loadable(() => import('../components/404'));

class AllRoute extends Component {

    render() {
        return (
            <Layout>
                <Router>
                    <Switch>
                        <Route path='/' exact component={ dynamicIndex } />

                        <Route path='*'  component={ dynamic404 } />
                    </Switch>
                </Router>
            </Layout>

        );
    }
}

export default connect()(AllRoute)
