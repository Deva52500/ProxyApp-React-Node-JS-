
import {UPDATE_SAMPLE_DATA,TEST_URL_INFO} from "./type"

export const resetTestInfo=()=>dispatch=>{
    dispatch({
        type:TEST_URL_INFO,
        payload:null
    })
}
export const testUrlBasic=(ip,port)=>dispatch=>{
    fetch('http://localhost:5020/api/proxy/testurlbasic', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            ip:ip,
            port:port
        })
    })
        .then(res => res.json())
        .then(res =>{
            dispatch({
            type:TEST_URL_INFO,
            payload:res.test_info
        });
        dispatch({
            type:UPDATE_SAMPLE_DATA,
            payload:res.proxyList
        })
    }
        )
}
export const testUrl=(ip,port)=>dispatch=>{
    
    fetch('http://localhost:5020/api/proxy/testurl', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            ip:ip,
            port:port
        })
    })
        .then(res => res.json())
        .then(res =>
            
            dispatch({
            type:TEST_URL_INFO,
            payload:res
        })
        )
   
}
export const updateData = () => dispatch => {

    fetch('http://localhost:5020/api/proxy/update', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(res =>
            
            dispatch({
            type:UPDATE_SAMPLE_DATA,
            payload:res.proxy
        })
        )
}
