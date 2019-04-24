export const methods = {
    getUsers(page = 1){
        let url = `/user/get_users?page=${page}`
        let token = this.$store.getters.token
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
        console.log(idUsuario)
        let con = confirm('¿Quieres eliminar este usuario?')
        if(con){
            let url = '/user/delete_user'

            this.$http.post(url,{idUsuario : idUsuario})
                .then(res => {
                    this.$notify({
                            group: 'foo',
                            type : 'success',
                            title: 'Bien',
                            text: 'Usuario eliminado.'
                        })
                    this.getUsers()
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
                })
        }
    },
    activarUser(idUsuario){
        let url = '/user/activar_user'

        this.$http.post(url,{idUsuario : idUsuario})
            .then(res => {
                this.$notify({
                    group: 'foo',
                    type : 'success',
                    title: 'Bien',
                    text: 'Usuario activado'
                })
                this.getUsers()        
            }).catch(err => {
                if(err.status == 404){
                    this.$notify({
                        group: 'foo',
                        type : 'error',
                        title: 'Error',
                        text: err.data.error
                    })
                }
            })
    }
}