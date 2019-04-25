<template>
    <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title text-capitalize" id="exampleModalLabel">Editando <strong>{{fullName}}</strong></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="mt-2">
                <label>Nombres (*)</label>
                <input type="text" class="form-control" v-model="nombres">
            </div>
            <div class="mt-2">
                <label>Apellido Paterno (*)</label>
                <input type="text" class="form-control" v-model="apellidoP">
            </div>
            <div class="mt-2">
                <label>Apellido Materno (*)</label>
                <input type="text" class="form-control" v-model="apellidoM">
            </div>
            <div class="mt-2">
                <label>Dirección</label>
                <input type="text" class="form-control" v-model="direccion">
            </div>
            <div class="mt-2">
                <label>Teléfono</label>
                <input type="text" class="form-control" v-model="telefono">
            </div>
           
            <div class="mt-2">
                <label>ROL (*)</label>
                <select name="" id="" class="form-control" v-model="rol">
                    <option value="0">Administrador</option>
                    <option value="1">Usuario</option>
                </select>
            </div>
           
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" @click="saveChanges">
                <template v-if="loading">
                    <pulse-loader :loading="true" color="white"></pulse-loader>
                </template>
                <template v-else>
                Guardar cambios
                </template>
            </button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            passwordFieldType : 'password',
            id : 0,
            nombres : '',
            apellidoP : '',
            apellidoM : '',
            direccion : '',
            telefono : '',
            rol : '1',
            loading : false
        }
    },
    methods: {
       saveChanges(){
           let url = '/user/edit_user'
            if(this.nombres == ''  || this.apellidoP == ''
                || this.apellidoM == ''){
                    this.$notify({
                    group: 'foo',
                    type : 'warn',
                    title: 'Error',
                    text: 'Por favor llene todos los campos requeridos.'
                     })
                return
                }
            this.loading = true
           this.$http.post(url,{
               'id' : this.id,
               'nombres' : this.nombres,
               'apellido_p' : this.apellidoP,
               'apellido_m' : this.apellidoM,
               'direccion' : this.direccion,
               'telefono' : this.telefono,
               'rol' : this.rol
           }).then(res => {
               console.log(res)
                this.$notify({
                group: 'foo',
                type : 'success',
                title: 'Bien',
                text: 'Cambios realizados correctamente.'
            })
            this.$store.dispatch('userCreated')
        
            $('#editUserModal').modal('hide')
           }).catch(err => {
               if(err.status == 404){
                    this.$notify({
                    group: 'foo',
                    type : 'warn',
                    title: 'Error',
                    text: 'No se han producido cambios.'
                });
               }
            }).finally(() => {
                this.loading = false
            })
       }
    },
    computed: {
        fullName(){
            let userInfo = this.$store.getters.userInfoEdit
            return `${userInfo.nombres} ${userInfo.apellido_p} ${userInfo.apellido_m}`
        },
        info(){
            return this.$store.getters.userInfoEdit
        }
    },
    watch: {
        info(){
            this.id = this.$store.getters.userInfoEdit.id
             this.nombres = this.$store.getters.userInfoEdit.nombres
            this.apellidoP = this.$store.getters.userInfoEdit.apellido_p
            this.apellidoM = this.$store.getters.userInfoEdit.apellido_m
            this.direccion = this.$store.getters.userInfoEdit.direccion
            this.telefono = this.$store.getters.userInfoEdit.telefono
            this.rol = this.$store.getters.userInfoEdit.rol
        }
    },
}
</script>

<style scoped>
#basic-addon2{
    cursor: pointer;
}
</style>