import React,{ Component } from 'react';


class LoginMenu extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        let csrf = localStorage.getItem("token");

        return(
            <div>

            </div>
        )
    }
}

export default LoginMenu;