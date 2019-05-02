<template>
<div class="modal fade" id="ModalEditPiezaDental" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editando <strong>{{info.pieza_dental}}</strong></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="form-group">
            <label for="tratamiento">Nombre tratamiento</label>
            <input type="text" id="tratamiento" v-model="newNombrePiezaDental" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" 
            class="btn btn-success"
            @click="saveChangesPiezaDental"
        >
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
            newNombrePiezaDental : '',
            loading : false
        }
    },
    methods : {
        saveChangesPiezaDental(){
            let url = '/pieza_dental/edit_pieza_dental'
            if(this.newNombrePiezaDental == ''){
                 this.$notify({
                    group: 'foo',
                    type : 'warn',
                    title: 'Atención',
                    text: 'El campo no puede estar vacio.'
                })
                return
            }
            this.loading = true
            this.$http.post(url,{
                'id' : this.info.id,
                'new_nombre_pieza_dental' : this.newNombrePiezaDental
            })
                .then(res => {
                    console.log(res)
                     this.$notify({
                            group: 'foo',
                            type : 'success',
                            title: 'Bien',
                            text: res.data.success
                        })
                    this.$store.dispatch('reloadTablePiezaDental')
                    $("#ModalEditPiezaDental").modal('hide')
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
                    this.loading = false
                })
        }
    },
    computed : {
        info(){
            this.newNombrePiezaDental = this.$store.getters.piezaDentalEditInfo.pieza_dental
            return this.$store.getters.piezaDentalEditInfo
        }
    }
}
</script>