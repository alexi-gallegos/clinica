<template>
    <div>
         <div class="row">
            <div class="row col-md-9 mt-4 ml-2">
                <div class="input-group mb-3 col-md-10">
                    <input class="form-control"
                           type="text" 
                           id="filter"
                           placeholder="Buscar por nombre tratamiento o valor. Ej : 10000"
                           v-model="filter"
                           readonly>
                </div> 
            </div>
            <div class="col-xs-12 col-md-3 mt-auto ml-auto">
                <button 
                    class="btn btn-primary mb-sm-2"
                    data-toggle="modal" 
                    data-target="#ModalNewTratamiento"
                >    
                    <font-awesome-icon icon="receipt" /> Agregar Tratamiento
                </button>
            </div>
        </div>
        <div v-if="loadingDelete">
            <pulse-loader :loading="true" color="black"></pulse-loader>
        </div>
        <template v-if="!loading">
            <div v-if="tratamientos != ''">
                <table class="table table-hover text-center">
                    <thead>
                        <tr>
                        <th scope="col">Código <span id="sort" @click="sort('id')"><font-awesome-icon icon="sort"/></span></th>
                        <th scope="col">Nombre Tratamiento <span id="sort" @click="sort('tratamiento')"><font-awesome-icon icon="sort"/></span></th>
                        <th scope="col">Valor Tratamiento <span id="sort" @click="sort('valor')"><font-awesome-icon icon="sort"/></span></th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tratamiento,index) in table" 
                        v-show="(page - 1) * NUM_RESULTS <= index  && page * NUM_RESULTS > index" :key="index">
                            <td>{{ tratamiento.id }}</td>
                            <td>{{ tratamiento.tratamiento }}</td>
                            <td>$ {{ tratamiento.valor.toLocaleString() }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Botones">
                                    <button 
                                        type="button" 
                                        class="btn btn-warning"
                                        data-toggle="modal" 
                                        data-target="#ModalEditTratamiento"
                                        @click="editTratamiento(tratamiento)">
                                        Editar
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteTratamiento(tratamiento.id)">
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                  <!-- Controles -->  
                <div v-if="table.length > 5">
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
            </div>
            <div v-else>
                <div class="alert alert-danger text-center" role="alert">
                    No hay tratamientos creados.
                </div>
            </div>
           <div v-if="table == '' && filter != ''" class="alert alert-danger text-center" role="alert">
                    No hay coincidencias.
            </div>
        </template>
        <template v-else>
             <div class="ml-auto mt-3">
                <pulse-loader :loading="true" color="black"></pulse-loader>
            </div>
        </template>

        <modal-new-tratamiento/>
        <modal-edit-tratamiento/>
    </div>
</template>

<script>
import ModalNewTratamiento from './NewTratamientoModal'
import ModalEditTratamiento from './EditTratamientoModal'
import { methods } from './Methods'
export default {
    data(){
        return{
            tratamientos : [],
            NUM_RESULTS : 5,
            loading : true,
            page : 1,
            totalPages : 0,
            filter : '',
            currentSort : 'id',
            currentSortDir : 'asc',
            loadingDelete : false
        }
    },
    methods,
    components : {
        'modal-new-tratamiento' : ModalNewTratamiento,
        'modal-edit-tratamiento' : ModalEditTratamiento
    },
    computed : {
        reloadTable(){
            return this.$store.getters.reloadTableTratamiento
        },
        table(){
            return this.tratamientos.filter((tratamiento) => {
                return tratamiento.tratamiento.toLowerCase().match(this.filter.toLowerCase()) || 
                    tratamiento.valor.toString().match(this.filter)
            }).sort((a, b) => {
                if(this.currentSort == "tratamiento"){
                    if (this.currentSortDir === 'asc') {
                    // return a[this.currentSort].toLowerCase() >= b[this.currentSort].toLowerCase();  
                        return a.tratamiento.localeCompare(b.tratamiento,{sensitivity : 'base'})
                    }
                    // return a[this.currentSort].toLowerCase() <= b[this.currentSort].toLowerCase();
                    return b.tratamiento.localeCompare(a.tratamiento,{sensitivity : 'base'})

                }else{
                     if (this.currentSortDir === 'asc') {
                    return a[this.currentSort] - b[this.currentSort];      
                    }
                    return b[this.currentSort] - a[this.currentSort]  ;
                }
               
            }) // sort
        },
       
    },
    watch:{
        reloadTable(){
            this.getTratamientos()
        },
        tratamientos(){
            if(this.tratamientos != ''){
                $('#filter').prop('readonly', false);
            }else{
                $('#filter').prop('readonly', true);
            }
        }
    },
    mounted(){
        this.getTratamientos()
    }
}
</script>

<style scoped>
#sort{
    cursor: pointer;
}
</style>
