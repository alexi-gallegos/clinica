<template>
<div class="modal fade" id="ModalVerPresupuesto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog mw-100 w-75" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 v-if="!show" class="modal-title" id="exampleModalLabel">
                Presupuesto para <strong>{{ fullName(info.paciente) }} | {{ rut(info.paciente.rut)}}</strong>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div v-if="show">
                <pulse-loader :loading="true" color="black"></pulse-loader>
          </div>
          <div v-else>
            <div>
                  <strong><font-awesome-icon icon="user-md" /> {{ fullName(info.profesional) }}</strong>
            </div>
            <div>
              
              <table class="table table-striped text-justify">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tratamiento</th>
                    <th scope="col">Pieza Dental</th>
                    <th scope="col">Posiciones</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tratamiento,index) in tratamientos" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ tratamiento.tratamiento }}</td>
                    <td v-text="tratamiento.pieza_dental ? tratamiento.pieza_dental : '-'"></td>
                    <td>
                        <template v-for="(posicion,index) in tratamiento.posiciones">
                           <span :key="index">{{posicion.posicion}}
                           </span>
                           <span v-if="index+1 < tratamiento.posiciones.length">, </span>
                            
                        </template>
                    </td>
                    <td style="white-space:nowrap;">$ {{ tratamiento.valor.toLocaleString() }}</td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td style="white-space:nowrap;" class="bg-info"><strong>Valor Total : $ {{ info.valor_total.toLocaleString() }}</strong></td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {format} from 'rut.js'
export default {
    data() {
        return {
            
        }
    },
    methods : {
       fullName(person){
            return `${person.nombres} ${person.apellido_p} ${person.apellido_m}`
        },
        rut(rut){
          return format(rut)
        }
    },  
    computed:{
        info(){
            return this.$store.getters.verPresupuestoInfo.presupuesto[0]
        },
        tratamientos(){
          return this.$store.getters.verPresupuestoInfo.tratamientos
        },
        show(){
            return this.$store.getters.loadingVerPresupuesto
        }
    }
}
</script>

<style scoped>

</style>
