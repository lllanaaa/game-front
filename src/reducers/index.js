import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 创建store
const store = createStore(reducer, compose(
    applyMiddleware(thunk),   // 使用redux-thunk中间件
    window.devToolsExtension ? window.devToolsExtension() : f => f //开启redux调试
));

export default store