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
            'direccion' : this.direccion,
            'telefono' : this.telefono,
            'email' : this.email,
            'password' : this.password,
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