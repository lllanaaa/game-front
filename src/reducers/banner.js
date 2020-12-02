
export const banner = (state = {}, action)=>{
    switch(action.type) {
        case "BANNER":
            return {
                ...state,
                bannerData: action.data
            };
        default:
            return state;
    }
};