 export default  {
        state : {
        token : null,
        num : 1,
        userCreated : 0,
        userInfo : []
},
    getters : {
        token(state){
            return state.token
        },
        num(state){
            return state.num
        },
        isLoggedIn(state){
            return !!state.token
        },
        userCreated(state){
            return state.userCreated
        },
        userInfo(state){
            return state.userInfo
        }
},
    mutations : {
        SET_TOKEN(state, token){
            state.token = token
        },
        LOGOUT(state){
            state.token = null
            state.userInfo = []
        },
        USER_CREATED(state){
            state.userCreated += 1
        },
        SET_USER_INFO(state,userInfo){
            state.userInfo = userInfo
        }
},
    actions : {
        setToken({commit}, token){
            commit('SET_TOKEN', token)
        },
        logout({commit}){
            commit('LOGOUT')
        },
        userCreated({commit}){
            commit('USER_CREATED')
        },
        setUserInfo({commit}, userInfo){
            commit('SET_USER_INFO',userInfo)
        }
    }
}


