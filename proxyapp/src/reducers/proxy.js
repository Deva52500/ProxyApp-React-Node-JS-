import {
    UPDATE_SAMPLE_DATA,TEST_URL_INFO
} from '../actions/type';

const initialState = {
    proxyList: [],
    test_info:null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SAMPLE_DATA:
            return {
                ...state,
                proxyList: action.payload
            };
        case TEST_URL_INFO:
            return {
                ...state,
                test_info:action.payload
            }
       
        default:
            return state
    }
}