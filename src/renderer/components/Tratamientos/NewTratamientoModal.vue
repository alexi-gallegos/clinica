<template>
   <!-- Modal -->
<div class="modal fade" id="ModalNewTratamiento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nuevo tratamiento</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="tratamiento">Nombre tratamiento</label>
            <input type="text" id="tratamiento" v-model="nombreTratamiento" class="form-control">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">$</span>
            </div>
            <input type="text" class="form-control" aria-label="Username" v-model="valorTratamiento" 
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
        <button type="button" class="btn btn-primary" @click="crearTratamiento">
            <template v-if="loading">
                <pulse-loader :loading="true" color="white"></pulse-loader>
            </template>
            <template v-else>
                Crear tratamiento
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
            nombreTratamiento : '',
            valorTratamiento : '',
            loading : false,
            checked : false
        }
    },
    methods : {
        crearTratamiento(){
            let url = '/tratamiento/new_tratamiento'

                if(this.nombreTratamiento == '' || this.valorTratamiento == ''){
                    this.$notify({
                    group: 'foo',
                    type : 'warn',
                    title: 'Atención',
                    text: 'Complete ambos campos, por favor.'
                })
                return
            }
            this.loading = true
            if(typeof this.valorTratamiento === 'string'){
                this.valorTratamiento = this.valorTratamiento.replace(/\D/g,'')
            }
        
            this.$http.post(url,{
                'nombre_tratamiento' : this.nombreTratamiento,
                'valor_tratamiento' : this.valorTratamiento,
                'pieza_dental' : this.checked
            })
                .then(res => {
                    console.log(res)
                     this.$notify({
                            group: 'foo',
                            type : 'success',
                            title: 'Bien',
                            text: 'Tratamiento creado correctamente.'
                        })
                    $('#ModalNewTratamiento').modal('hide')
                    this.$store.dispatch('reloadTableTratamiento')
                    this.valorTratamiento = ''
                    this.nombreTratamiento = ''
                    this.checked = false
                }).catch(err => {
                    console.log(err)
                    if(err.status == 404 || err.status == 403){
                        this.$notify({
                            group: 'foo',
                            type : 'warn',
                            title: 'Atención',
                            text: err.data.err
                        })
                    }                
                }).finally(() => {
                    this.loading = false
                })
        }
    }
}
</script>