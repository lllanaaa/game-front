import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '../utils/loadable';

// 以下是组件懒加载
const dynamicIndex = loadable(() => import('../components'));
const dynamic404 = loadable(() => import('../components/404'));
const dynamicGame = loadable(() => import('../components/game'));
const dynamicUserMyCart = loadable(() => import('../components/user/myCart'));
const dynamicUserMyGame = loadable(() => import('../components/user/myGame'));
const dynamicUserSetting = loadable(() => import('../components/user/setting'));
const dynamicSearch = loadable(() => import('../components/search/index'));
const dynamicSearchClassify = loadable(() => import('../components/classify/index'));

class AllRoute extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={ dynamicIndex } />
                    <Route path='/shoppingMall' exact component={ dynamicIndex } />
                    <Route path='/game'  component={ dynamicGame } />
                    <Route path='/user/myCart' component={ dynamicUserMyCart } />
                    <Route path='/user/myGame' component={ dynamicUserMyGame } />
                    <Route path='/user/setting' component={ dynamicUserSetting } />
                    <Route path='/search' component={ dynamicSearch } />
                    <Route path='/classify' component={ dynamicSearchClassify } />
                    <Route path='*'  component={ dynamic404 } />
                </Switch>
            </Router>

        );
    }
}

export default AllRoute
