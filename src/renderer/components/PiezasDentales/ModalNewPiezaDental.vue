<template>
   <div class="modal fade" id="ModalNewPiezaDental" tabindex="-1" role="dialog" aria-labelledby="ModalNewPiezaDental" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nueva Pieza Dental
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                 <div class="form-group">
                    <label for="tratamiento">Nombre Pieza Dental</label>
                    <input type="text" id="tratamiento" v-model="nombrePiezaDental" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" @click="createPiezaDental">
                    <template v-if="loading">
                        <pulse-loader :loading="true" color="white"></pulse-loader>
                    </template>
                    <template v-else>
                        Crear Pieza Dental
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
            nombrePiezaDental : '',
            loading :false
        }
    },
    methods : {
        createPiezaDental(){
            let url = '/pieza_dental/new_pieza_dental'
            if(this.nombrePiezaDental == ''){
                this.$notify({
                    group: 'foo',
                    type : 'warn',
                    title: 'Atención',
                    text: 'Ingrese nombre de la pieza dental, por favor.'
                })
                return
            }
            this.loading = true
            this.$http.post(url,{
                'nombre_pieza_dental' : this.nombrePiezaDental
            }).then(res => {
                this.$notify({
                    group: 'foo',
                    type : 'success',
                    title: 'Bien',
                    text: res.data.success
                })
                this.$store.dispatch('reloadTablePiezaDental')
                $("#ModalNewPiezaDental").modal('hide')
                this.nombrePiezaDental = ''
            }).catch(err => {
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>