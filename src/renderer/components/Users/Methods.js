import {format,clean} from 'rut.js'
export const methods = {
    editarUser(user){
        this.$store.dispatch('setUserInfoEdit',user)
    },
    searchUsers(){
        if(this.filter == ''){
            this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Atención',
                text: 'Ingrese texto para buscar.'
            })
            return
        }
        this.searching = true
        let url = `/user/search_users?filtro=${this.filter}`
        if(this.cleanRut){
            this.filter = clean(this.filter)
        }

        this.$http.get(url)
            .then(res => {
                console.log(res)
                if(res.data.users == ''){
                    this.resultsSearch = 0
                }else{
                    this.resultsSearch = res.data.users
                }
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.searching = false
            })
    },
    clearSearch(){
        this.resultsSearch = []
        this.filter = ''
    },
    formattedRut(rut){
        return format(rut)
    },
    getUsers(page = 1){
        let url = `/user/get_users?page=${page}`
        this.loading = true
        this.$http.get(url)
            .then(res => {
                console.log(res)
                this.loading = false
                this.users = res.data.usuarios.data
                this.totalPages = res.data.usuarios.last_page
            }).catch(err => {
                console.log(err.response)
                this.loading = false
            });
    },
    deleteUser(idUsuario){
        let con = confirm('¿Quieres eliminar este usuario?')
        if(con){
            let url = '/user/delete_user'
            this.loadingDelete = true
            this.$http.post(url,{idUsuario : idUsuario})
                .then(res => {
                    this.$notify({
                            group: 'foo',
                            type : 'success',
                            title: 'Bien',
                            text: 'Usuario eliminado.'
                        })
                        if(this.filter == ''){
                            this.getUsers()
                        }else{
                            this.searchUsers()
                        }
                }).catch(err => {
                    console.log(err)
                    if(err.status == 404){
                        this.$notify({
                            group: 'foo',
                            type : 'error',
                            title: 'Error',
                            text: err.data.error
                        })
                    }
                }).finally(() => {
                    this.loadingDelete = false
                })
        }
    },
    activarUser(idUsuario){
        let url = '/user/activar_user'
        this.loadingActivate = true
        this.$http.post(url,{idUsuario : idUsuario})
            .then(res => {
                this.$notify({
                    group: 'foo',
                    type : 'success',
                    title: 'Bien',
                    text: 'Usuario activado'
                })
                if(this.filter == ''){
                    this.getUsers()        
                }else{
                    this.searchUsers()
                }
            }).catch(err => {
                if(err.status == 404){
                    this.$notify({
                        group: 'foo',
                        type : 'error',
                        title: 'Error',
                        text: err.data.error
                    })
                }
            }).finally(() => {
                this.loadingActivate = false
            })
    }
}