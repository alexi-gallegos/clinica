export const methods = {

    newPaciente(){
        if(this.rut == '' || this.nombres == '' || this.apellidoP == '' || this.apellidoM == ''){
            this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Error',
                text: 'Por favor complete todos los campos.'
            })
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
        let url = '/paciente/new_paciente'
        this.loading = true


        this.$http.post(url,{
            'rut' : this.cleanRut,
            'nombres' : this.nombres,
            'apellido_p' : this.apellidoP,
            'apellido_m' : this.apellidoM,
            'direccion' : this.direccion,
            'telefono' : this.telefono,
            'email' : this.email
        })
            .then(res => {
                console.log(res)
                this.$notify({
                    group: 'foo',
                    type : 'success',
                    title: 'Bien',
                    text: res.data.success
                })
                $("#ModalNewPaciente").modal('hide')
                this.$store.dispatch('reloadTablePaciente')
                this.rut = ''
                this.nombres = ''
                this.apellidoP = ''
                this.apellidoM = ''
                this.direccion = ''
                this.telefono = ''
                this.email = ''
            }).catch(err => {
                console.log(err)
                if(err.status == 422){
                    this.$notify({
                        group: 'foo',
                        type : 'error',
                        title: 'Error',
                        text: err.data.errors.rut[0]
                    })
                }
                if(err.status == 403 || err.status == 404){
                    this.$notify({
                        group: 'foo',
                        type : 'error',
                        title: 'Error',
                        text: err.data.error
                    })
                }
            }).finally(() => {
                this.loading = false
            })
    },

    searchPacientes(){

    },
   

}