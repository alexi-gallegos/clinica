export const methods = {
    createUser(){
        let url = '/user/new_user'
        if(this.nombre == '' || this.email == '' || this.password == '' || this.apellidoP == ''
        || this.apellidoM == '' || this.rut == ''){
            this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Error',
                text: 'Por favor complete todos los campos.'
            });
            return
        }
        if(!this.validRut || this.rut.length < 9){
            this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Error',
                text: 'Ingrese un R.U.T. válido.'
            });
            return
        }
        this.loading = true
        this.$http.post(url,{
            'rut' : this.cleanRut,
            'nombres' : this.nombres,
            'apellidoP' : this.apellidoP,
            'apellidoM' : this.apellidoM,
            'telefono' : this.telefono,
            'email' : this.email,
            'password' : this.password,
        }).then(res => {
            console.log(res)
            this.$notify({
                group: 'foo',
                type : 'success',
                title: 'Bien',
                text: 'Usuario creado.'
            });
            $('#ModalNewUser').modal('hide')
            this.$store.dispatch('userCreated')
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.loading = false
             this.rut = ''
             this.nombres = ''
             this.apellidoP = ''
             this.apellidoM = ''
             this.telefono = ''
             this.email = ''
             this.password = ''
        })
    },
     switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
}