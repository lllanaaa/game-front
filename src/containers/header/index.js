import { connect } from 'react-redux'
import { loginDataAction } from '../../actions/header';

const mapStateToProps = (state,props) => {
    return {
        loginData: state.loginDataReducer.data || {},
    }
};

const mapDispatchToProps = (dispatch,props) => {
    return {
        loginDataFunc:(data) => {
            dispatch(loginDataAction(data))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header)