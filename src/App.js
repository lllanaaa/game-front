import React,{ Component } from 'react'
import { Provider } from 'react-redux'
import store from './reducers'
import AllRoute from './route/AllRoute'

export default class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <AllRoute/>
            </Provider>
        );
    }
}
