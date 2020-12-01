import { connect } from 'react-redux';
import Banner from '../../components/banner';
import { getBannerAction } from '../../actions/home';

const mapStateToProps = (state,props) => {
    return {
        homeBannerData: state.homeBanner.homeBannerData || [],   //传输轮播图数据
    }
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        //接收轮播图数据并且dispatch到store中
        getBannerFunc:(data) => {
            dispatch( getBannerAction(data) )
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Banner)
