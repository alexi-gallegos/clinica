<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                <th style="white-space:nowrap;" scope="col">
                        ID <span id="sort" @click="sort('id')"><font-awesome-icon icon="sort"/></span>
                </th>
                <th style="white-space:nowrap;" scope="col">
                        R.U.T. Cliente <span id="sort" @click="sort('rut')"><font-awesome-icon icon="sort"/></span>
                </th>
                <th scope="col">Nombre Completo Cliente</th>
                <th class="text-center" scope="col">Profesional</th>
                <th>Valor Presupuesto</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(presupuesto,index) in table" :key="index"
                v-show="(page - 1) * NUM_RESULTS <= index  && page * NUM_RESULTS > index">
                    <th scope="row">{{ presupuesto.id }}</th>
                    <td>{{ formattedRut(presupuesto.paciente.rut) }}</td>
                    <td>{{ fullName(presupuesto.paciente) }}</td>
                    <td>{{ fullName(presupuesto.profesional) }}</td>
                    <td class="text-center">${{ presupuesto.valor_total.toLocaleString() }}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" 
                                    class="btn btn-primary" 
                                    data-toggle="modal" 
                                    data-target="#ModalVerPresupuesto"
                                    @click="verPresupuesto(presupuesto.id)"
                            >
                                <font-awesome-icon icon="eye" />
                            </button>
                            <button type="button" class="btn btn-warning">
                                <font-awesome-icon icon="edit" />
                            </button>
                            <button type="button" class="btn btn-danger">
                                <font-awesome-icon icon="trash" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="table.length > 0">
                    <div class="text-center">
                        <span class="ml-auto">Página {{page}} de {{ Math.ceil(table.length / NUM_RESULTS) }}</span>
                    </div>      
                    <nav aria-label="Page navigation" class="text-center">
                        <ul class="pagination text-center justify-content-center">
                            <li class="page-item"
                                :class="page == 1 ? 'disabled' : ''">
                                <a class="page-link" href="#" aria-label="Previous" 
                                    @click.prevent="page -= 1">
                                    <span aria-hidden="true">Anterior</span>
                                </a>
                            </li>
                            <li class="page-item"
                                :class="page * NUM_RESULTS / table.length >= 1 ? 'disabled' : ''">
                                <a class="page-link" href="#" aria-label="Next" 
                                @click.prevent="page += 1">
                                    <span aria-hidden="true">Siguiente</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
        </div>
         <div v-else-if="presupuestos.length === 0">
                <div class="alert alert-danger text-center" role="alert">
                    No hay tratamientos creados.
                </div>
        </div>
        <div v-if="table.length === 0 && filtro != ''" class="alert alert-danger text-center" role="alert">
                    No hay coincidencias.
        </div>
           
        
        <!-- {{presupuestos}} -->
        <modal-ver-presupuesto/>
    </div>
</template>

<script>
import ModalVerPresupuesto from './ModalVerPresupuesto'
import {format} from 'rut.js'
export default {

    data() {
        return {
            NUM_RESULTS : 5,
            page : 1,
            filter : '',
            currentSort : 'id',
            currentSortDir : 'asc',
        }
    },
    props : {
        presupuestos : [Array]
    },

    methods : {
         sort(col) {
        // if you click the same label twice
        if(this.currentSort == col){
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }else{
          this.currentSort = col;
        } // end if
  
      }, // 
        formattedRut(rut){
            return format(rut)
        },
        fullName(person){
            return `${person.nombres} ${person.apellido_p} ${person.apellido_m}`
        },
        verPresupuesto(id){
            this.$store.dispatch('verPresupuestoInfo',id)
        },
    },
    components : {
        ModalVerPresupuesto
    },
    computed:{
        filtro(){
            return this.$store.getters.filtro
        },
        table(){
            if(this.presupuestos.length > 0){
            return this.presupuestos.filter((presupuesto) => {
                return presupuesto.paciente.rut.match(this.filtro) || 
                presupuesto.paciente.nombres.toLowerCase().match(this.filtro.toLowerCase()) ||
                presupuesto.paciente.apellido_p.toLowerCase().match(this.filtro.toLowerCase()) ||
                presupuesto.paciente.apellido_m.toLowerCase().match(this.filtro.toLowerCase())
            }).sort((a, b) => {
                if(this.currentSort == "rut"){
                    if (this.currentSortDir === 'asc') {
                    return a.paciente.rut - b.paciente.rut;      
                    }
                    return b.paciente.rut - a.paciente.rut  ;

                }else{
                    if (this.currentSortDir === 'asc') {
                    return a[this.currentSort] - b[this.currentSort];      
                    }
                    return b[this.currentSort] - a[this.currentSort]  ;
                }
            
            }) // sort
        }//if
        },
    },
     
}
</script>

<style scoped>
#sort{
    cursor: pointer;
}
</style>
