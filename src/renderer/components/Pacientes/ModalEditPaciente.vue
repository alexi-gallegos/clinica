<template>
<div class="modal fade" id="ModalEditPaciente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
                <label>E-mail</label>
                <input type="email" class="form-control" v-model="email">
            </div>
           
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" 
                class="btn btn-success"
                @click="saveChanges">
                <template v-if="loading">
                    <pulse-loader :loading="true" color="white"></pulse-loader>
                </template>
                <template v-else>
                    Guardar Cambios
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
            id : '',
            nombres : '',
            apellidoP : '',
            apellidoM : '',
            direccion : '',
            telefono : '',
            email : '',
            loading : false
        }
    },
    methods : {
        saveChanges(){
            let url = '/paciente/edit_paciente'
            if(this.nombres == '' || this.apellidoP == '' || this.apellidoM == ''){
              this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Atención',
                text: 'Complete los campos marcados con (*) .'
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
              'email' : this.email
            }).then(res => {
              this.$notify({
                group: 'foo',
                type : 'success',
                title: 'Bien',
                text: res.data.success
              })
              $("#ModalEditPaciente").modal('hide')
              this.$store.dispatch('reloadTablePaciente')
              this.$store.dispatch('reloadTableSearchPaciente')
            }).catch(err => {
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
        }
    },
    computed : {
        info(){            
            return this.$store.getters.pacienteEditInfo
        }
    },
    watch : {
      info(){
            this.id = this.info.id
            this.nombres = this.info.nombres
            this.apellidoP = this.info.apellido_p
            this.apellidoM = this.info.apellido_m
            this.direccion = this.info.direccion
            this.telefono = this.info.telefono
            this.email = this.info.email
      }
    }
}
</script>