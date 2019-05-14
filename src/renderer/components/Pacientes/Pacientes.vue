<template>
<div>
     <div class="row">
            <div class="row col-md-9 mt-4 ml-2">
                <div class="input-group mb-3 col-md-10">
                    <input class="form-control" type="text" v-model="filter" placeholder="Buscar por R.U.T., nombre o email">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" 
                                type="button" 
                                id="button-addon2" 
                                @click="searchPacientes">
                            <font-awesome-icon icon="search"/>
                        </button>
                    </div>
                    <span class="w-100"></span>
                    <small id="KeywordsHelpBlock" class=" text-muted">
                        Ingresar R.U.T. sin punto ni guion.
                    </small>
                </div> 
            </div>
            <div v-if="this.$route.path == '/pacientes'" class="col-xs-12 col-md-3 mt-auto ml-auto">
                <button 
                    class="btn btn-primary mb-sm-2"
                    data-toggle="modal" 
                    data-target="#ModalNewPaciente"
                >    
                    <font-awesome-icon icon="user" /> Agregar Paciente
                </button>
            </div>
        </div> 
        <template v-if="this.$route.path == '/pacientes'">
        <div class="text-center" v-if="loadingButtons">                            
            <pulse-loader :loading="true" color="black"></pulse-loader>
        </div>
            <!-- <span v-if="pacientes.length >0"> <strong>{{pacientes.length}}</strong> resultado(s)</span>
            <button class="btn btn-warning" @click="clearSearch">Limpiar busqueda</button>
            <div v-if="pacientes === 0" class="alert alert-danger mt-4 text-center" role="alert">
                No hay resultados para esta busqueda.
            </div> -->
            <!-- {{pacientes}} -->
            <table class="table table-bordered mt-2">
            <thead>
                <tr>
                    <th>R.U.T.</th>
                    <th>Nombres</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th style="white-space:nowrap;">E-mail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!loading && pacientes != ''">
                <tr v-for="(paciente,index) in pacientes" :key="index">
                    <td style="white-space:nowrap;">{{ formattedRut(paciente.rut) }}</td>
                    <td class="text-capitalize">{{ paciente.nombres }}</td>
                    <td class="text-capitalize">{{ paciente.apellido_p }}</td>
                    <td class="text-capitalize">{{ paciente.apellido_m }}</td>
                    <td class="text-capitalize">{{ paciente.direccion }}</td>
                    <td class="text-capitalize">{{ paciente.telefono }}</td>
                    <td>{{ paciente.email }}</td>
                    <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <!-- <button type="button" class="btn btn-primary">Editar</button> -->
                                <button
                                    type="button" 
                                    class="btn btn-sm btn-success"
                                    data-toggle="modal" 
                                    data-target="#ModalEditPaciente"
                                    @click="editPaciente(paciente)"
                                >Editar</button>
                                <button
                                    type="button" 
                                    class="btn btn-sm btn-danger"
                                    @click="deletePaciente(paciente.id)"
                                >
                                    Eliminar
                                </button>
                            </div>
                    </td>
                </tr>
                </template>
                <template v-else-if="loading">
                    <tr>
                        <td colspan="10">
                            <pulse-loader :loading="true" color="black"></pulse-loader>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="10">
                            <div class="alert alert-danger text-center" role="alert">
                                No hay pacientes creados.
                            </div>
                        </td>
                    </tr>
                  
                </template>
            </tbody>
            </table>
        <paginate
            v-if="totalPages > 1"
            v-model="page"
            :page-count="totalPages"
            :click-handler="getPacientesPaginate"
            :prev-text="'Anterior'"
            :next-text="'Siguiente'"
            :container-class="'pagination justify-content-center'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"  
            :prev-class="'page-link'"
            :next-class="'page-link'"
            :margin-pages="2"
            :hide-prev-next="true"
            >
        </paginate>
        <modal-new-paciente/>
        <modal-edit-paciente/>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
</div>
</template>

<script>
import { methods } from './Methods'
import ModalNewPaciente from './ModalNewPaciente'
import ModalEditPaciente from './ModalEditPaciente'
export default {
    data() {
        return {
            filter : '',
            pacientes : [],
            searching : false,
            loadingButtons : false,
             page : 1,
            totalPages : 0,
            loading : true
        }
    },
    components : {
        'modal-new-paciente' : ModalNewPaciente,
        'modal-edit-paciente' : ModalEditPaciente
    },
    computed : {
        reload(){
            return this.$store.getters.reloadTablePaciente
        },
        search(){
            return this.$store.getters.searchPacientes
        }
    },
    methods,
    mounted(){
        this.getPacientesPaginate()
    },
    watch :{
        reload(){
            this.getPacientesPaginate()
        },
        search(){
            this.filter = ''
        }
    }
}
</script>