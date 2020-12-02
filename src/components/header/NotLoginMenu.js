import React,{ Component } from 'react';

class NotLoginMenu extends Component{

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

export default NotLoginMenu;