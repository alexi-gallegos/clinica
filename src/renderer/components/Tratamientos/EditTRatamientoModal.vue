<template>
   <div class="modal fade" id="ModalEditTratamiento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editando tratamiento 
            <strong class="text-capitalize">{{info.tratamiento}}</strong>    
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <!-- {{info}} -->
          
        <div class="form-group">
            <label for="tratamiento">Nombre tratamiento</label>
            <input type="text" id="tratamiento" v-model="newNombreTratamiento" class="form-control">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">$</span>
            </div>
            <input type="text" class="form-control" aria-label="Username" v-model="newValorTratamiento" 
            placeholder="Ej: 40.000 o  40000" aria-describedby="basic-addon1">
        </div>
         <div class="form-check">
            <label class="form-check-label" for="exampleCheck1">
            <input type="checkbox" v-model="checked" class="form-check-input" id="exampleCheck1">¿Este procedimiento requiere modulo pieza dental?
            </label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success" @click="saveTratamiento">
            <template v-if="loadingSavingChanges">
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
            newNombreTratamiento : '',
            newValorTratamiento : '',
            checked : false,
            loadingSavingChanges : false
        }
    },
    methods : {
        saveTratamiento(){
            let url = '/tratamiento/edit_tratamiento'
            if(this.newValorTratamiento == '' || this.newNombreTratamiento == ''){
                this.$notify({
                    group: 'foo',
                    type : 'warn',
                    title: 'Atención',
                    text: 'Complete ambos campos, por favor.'
                })
                return
            }
            if(typeof this.newValorTratamiento === 'string'){
            this.newValorTratamiento =  this.newValorTratamiento.replace(/\D/g,'')
            }
            this.loadingSavingChanges = true
            this.$http.post(url,{
                'id' : this.info.id,
                'new_nombre_tratamiento' : this.newNombreTratamiento,
                'new_valor_tratamiento' : this.newValorTratamiento,
                'pieza_dental' : this.checked
            }).then(res => {
                    this.$notify({
                    group: 'foo',
                    type : 'success',
                    title: 'Bien',
                    text: res.data.success
                     })
                     $('#ModalEditTratamiento').modal('hide')
                    this.$store.dispatch('reloadTableTratamiento')           
                }).catch(err => {
                console.log(err)
                if(err.status == 404 || err.status == 403){
                     this.$notify({
                    group: 'foo',
                    type : 'error',
                    title: 'Error',
                    text: err.data.error
                })
                }
            }).finally(() => {
                this.loadingSavingChanges = false
            })
        }
    },
    computed: {
        info(){
            this.newNombreTratamiento = this.$store.getters.tratamientoEditInfo.tratamiento
            this.checked = this.$store.getters.tratamientoEditInfo.pieza_dental
            this.newValorTratamiento = this.$store.getters.tratamientoEditInfo.valor
            return this.$store.getters.tratamientoEditInfo
        }
    },
}
</script>