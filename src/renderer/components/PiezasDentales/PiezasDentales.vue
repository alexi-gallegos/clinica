<template>
    <div>
       <div class="row">
            <div class="row col-md-9 mt-4 ml-2">
                <div class="input-group mb-3 col-md-10">
                    <input class="form-control"
                           type="text" 
                           id="filter"
                           placeholder="Buscar por nombre"
                           v-model="filter"
                           readonly>
                </div> 
            </div>
            <div class="col-xs-12 col-md-3 mt-auto ml-auto">
                <button 
                    class="btn btn-primary mb-sm-2"
                    data-toggle="modal" 
                    data-target="#ModalNewPiezaDental"
                >    
                    <font-awesome-icon icon="tooth" /> Agregar Pieza Dental
                </button>
            </div>
        </div>
        <div v-if="loadingDelete" class="justify-content-center">
            <pulse-loader :loading="true" color="black"></pulse-loader>
        </div>
         <template v-if="!loading">
            <div v-if="piezasDentales != ''">
                <table class="table table-hover text-center">
                    <thead>
                        <tr>
                        <th scope="col">Código <span id="sort" @click="sort('id')"><font-awesome-icon icon="sort"/></span></th>
                        <th scope="col">Nombre Pieza <span id="sort" @click="sort('pieza_dental')"><font-awesome-icon icon="sort"/></span></th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(piezaDental,index) in table" 
                        v-show="(page - 1) * NUM_RESULTS <= index  && page * NUM_RESULTS > index" :key="index">
                            <td>{{ piezaDental.id }}</td>
                            <td>{{ piezaDental.pieza_dental }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Botones">
                                    <button 
                                        type="button" 
                                        class="btn btn-warning"
                                        data-toggle="modal" 
                                        data-target="#ModalEditPiezaDental"
                                        @click="editPiezaDental(piezaDental)">
                                        Editar
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deletePiezaDental(piezaDental.id)">
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
        <modal-new-pieza-dental/>
        <modal-edit-pieza-dental/>
    </div>
</template>

<script>
import ModalNewPiezaDental from './ModalNewPiezaDental'
import ModalEditPiezaDental from './ModalEditPiezaDental'
import {methods, computed} from './Methods'
export default {
    data() {
        return {
            loadingDelete : false,
            piezasDentales : [],
            filter : '',
            NUM_RESULTS : 5,
            page : 1,
            loading : true,
            currentSort : 'id',
            currentSortDir : 'asc',

        }
    },
    components : {
        'modal-new-pieza-dental' : ModalNewPiezaDental,
        'modal-edit-pieza-dental' : ModalEditPiezaDental
    },
    methods ,
    computed,
    watch : {
        reloadTable(){
            this.getPiezasDentales()
        },
        piezasDentales(){
            if(this.piezasDentales != ''){
                $('#filter').prop('readonly', false);
            }else{
                $('#filter').prop('readonly', true);
            }
        }
    },
    mounted(){
        this.getPiezasDentales()
    }
}
</script>

<style scoped>
#sort{
    cursor: pointer;
}
</style>
