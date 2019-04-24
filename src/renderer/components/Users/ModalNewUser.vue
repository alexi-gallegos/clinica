<template>
<div class="modal fade" id="ModalNewUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nuevo Usuario</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="mt-2">
                <label>Nombre</label>
                <input type="text" class="form-control" v-model="nombre">
            </div>
            <div class="mt-2">
                <label>E-mail</label>
                <input type="email" class="form-control" v-model="email">
            </div>
            <label for="password" class="mt-2">Contraseña</label>
           <div class="input-group mb-3">
                <input :type="passwordFieldType" id="password" v-model="password" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2" @click="switchVisibility"><font-awesome-icon icon="eye"/></span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="createUser">
                <template v-if="!loading">
                    Crear Usuario
                </template>
                <template v-else>
                    <pulse-loader :loading="loading" :color="color"></pulse-loader>
                </template>
            </button>
        </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            passwordFieldType : 'password',
            nombre : '',
            email : '',
            password : '',
            loading : false,
            color : 'white'
        }
    },
    methods : {
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
}
</script>

<style scoped>
#basic-addon2{
    cursor: pointer;
}
</style>
