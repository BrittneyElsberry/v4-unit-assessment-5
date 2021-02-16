const initialState = {
    username: {},
    profilePicture: ''
}

const UPDATE_USER = "UPDATE_USER"
const LOGOUT = "LOGOUT"

export const updateUser =(user)=> {

    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const logout =()=>{
    return {
        type: LOGOUT
    }
}



export default function heloReducer(state= initialState, action){
    switch(action.type){
        case updateUser: 
        return {
        ...initialState, ...action.payload 
          }

          case logout:
              return {
                  ...initialState
              }
        
            

        default: 
        return state
    }
    }
