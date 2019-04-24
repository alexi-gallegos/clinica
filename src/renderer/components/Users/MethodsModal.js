export const methods = {
    createUser(){
        let url = '/user/new_user'
        this.loading = true
        if(this.nombre == '' || this.email == '' || this.password == ''){
            this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Error',
                text: 'Por favor complete todos los campos.'
            });
            return
        }
        
        this.$http.post(url,{
            'nombre' : this.nombre,
            'email' : this.email,
            'password' : this.password
        }).then(res => {
            console.log(res)
            this.loading = false
            this.$notify({
                group: 'foo',
                type : 'success',
                title: 'Bien',
                text: 'Usuario creado.'
            });
            this.nombre = ''
            this.email = ''
            this.password = ''
            $('#ModalNewUser').modal('hide')
            this.$store.dispatch('userCreated')
        }).catch(err => {
            console.log(err)
        });
    },
     switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
}