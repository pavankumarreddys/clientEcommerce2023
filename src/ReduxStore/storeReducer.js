import {createStore} from 'redux'
const login = localStorage.getItem('isLogin')
const initialState = {
    isUserLogin:login,
    allProducts:[],
    apiStatus:false,
    cartListData:[],
}

function storeReducer(state=initialState,action){
    switch(action.type){
        case "Login":
            return {...state,isUserLogin:action.payload}
        case "addProducts":
            return {...state,allProducts:action.payload}
        case "apiStatus":
            return {...state,apiStatus:action.payload}
        case "cartItems":
            return {...state,cartListData: action.payload }
        default:
            return initialState
    }
}

const store = createStore(storeReducer)
export default store