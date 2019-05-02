 export default  {
        state : {
        token : null,
        num : 1,
        userCreated : 0, //ver el cambio de cuando se agrega un usuario/profesional
        reloadTableTratamiento : 0,
        reloadTablePiezaDental : 0,
        userInfo : [], //info del usuario que se muestra en el navbar
        userInfoEdit : [], //info del usuario que se muestra en el modal
        tratamientoEditInfo : [], //info del tratamiento a editar en el modal
        piezaDentalEditInfo : []
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
        },
        userInfoEdit(state){
            return state.userInfoEdit
        },
        reloadTableTratamiento(state){
            return state.reloadTableTratamiento
        },
        tratamientoEditInfo(state){
            return state.tratamientoEditInfo
        },
        reloadTablePiezaDental(state){
            return state.reloadTablePiezaDental
        },
        piezaDentalEditInfo(state){
            return state.piezaDentalEditInfo
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
        },
        SET_USER_INFO_EDIT(state,userInfo){
            state.userInfoEdit = userInfo
        },
        RELOAD_TABLE_TRATAMIENTO(state){
            state.reloadTableTratamiento += 1
        },
        SET_TRATAMIENTO_EDIT_INFO(state,info){
            state.tratamientoEditInfo = info
        },
        RELOAD_TABLE_PIEZA_DENTAL(state){
            state.reloadTablePiezaDental += 1
        },
        SET_PIEZA_DENTAL_EDIT_INFO(state,info){
            state.piezaDentalEditInfo = info
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
        },
        setUserInfoEdit({commit},userInfo){
            commit('SET_USER_INFO_EDIT',userInfo)
        },
        reloadTableTratamiento({commit}){
            commit('RELOAD_TABLE_TRATAMIENTO')
        },
        tratamientoEditInfo({commit},info){
            commit('SET_TRATAMIENTO_EDIT_INFO',info)
        },
        reloadTablePiezaDental({commit}){
            commit('RELOAD_TABLE_PIEZA_DENTAL')
        },
        piezaDentalEditInfo({commit},info){
            commit('SET_PIEZA_DENTAL_EDIT_INFO',info)
        }
    }
}


