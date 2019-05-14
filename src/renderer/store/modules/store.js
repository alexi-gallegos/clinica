 import axios from 'axios'
 export default  {
        state : {
        token : null,
        num : 1,
        userCreated : 0, //ver el cambio de cuando se agrega un usuario/profesional
        reloadTableTratamiento : 0,
        reloadTablePiezaDental : 0,
        reloadTablePaciente : 0,
        reloadTableSearchPaciente : 0,
        userInfo : [], //info del usuario que se muestra en el navbar
        userInfoEdit : [], //info del usuario que se muestra en el modal
        tratamientoEditInfo : [], //info del tratamiento a editar en el modal
        pacienteEditInfo : [],
        piezaDentalEditInfo : [],
        searchPacientes : '',
        verPresupuestoInfo : [],
        loadingVerPresupuesto : true,
        filtroTablaPresupuestos : ''
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
        },
        reloadTablePaciente(state){
            return state.reloadTablePaciente
        },
        pacienteEditInfo(state){
            return state.pacienteEditInfo
        },
        searchPacientes(state){
            return state.searchPacientes
        },
        reloadTableSearchPaciente(state){
            return state.reloadTableSearchPaciente
        },
        verPresupuestoInfo(state){
            return state.verPresupuestoInfo
        },
        loadingVerPresupuesto(state){
            return state.loadingVerPresupuesto
        },
        filtro(state){ // filtro de la tabla presupuestos
            return state.filtroTablaPresupuestos 
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
        },
        RELOAD_TABLE_PACIENTE(state){
            state.reloadTablePaciente += 1
        },
        SET_PACIENTE_EDIT_INFO(state,info){
            state.pacienteEditInfo = info
        },
        SET_SEARCH_PACIENTES(state,search){
            state.searchPacientes = search
        },
        RELOAD_TABLE_SEARCH_PACIENTE(state){
            state.reloadTableSearchPaciente += 1
        },
        SET_VER_PRESUPUESTO_INFO(state,info){
            state.verPresupuestoInfo = info
        },
        LOADING_VER_PRESUPUESTO(state,estado){
            state.loadingVerPresupuesto = estado
        },
        SET_FILTRO_TABLA_PRESUPUESTOS(state,filtro){
            state.filtroTablaPresupuestos = filtro
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
        },
        reloadTablePaciente({commit}){
            commit('RELOAD_TABLE_PACIENTE')
        },
        pacienteEditInfo({commit},info){
            commit('SET_PACIENTE_EDIT_INFO',info)
        },
        searchPacientes({commit},search){
            commit('SET_SEARCH_PACIENTES',search)
        },
        reloadTableSearchPaciente({commit}){
            commit('RELOAD_TABLE_SEARCH_PACIENTE')
        },
        verPresupuestoInfo({commit},id){
            commit('LOADING_VER_PRESUPUESTO',true)
            // commit('SET_VER_PRESUPUESTO_INFO',id)
            let url = `/presupuesto/get_presupuesto?id=${id}`

            axios.get(url)
                .then(res => {
                    console.log(res)
                    commit('SET_VER_PRESUPUESTO_INFO',res.data)
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    commit('LOADING_VER_PRESUPUESTO',false)
                })
            
        },
        filtroTablaPresupuestos({commit},filtro){
            commit('SET_FILTRO_TABLA_PRESUPUESTOS',filtro)
        }
    }
}


