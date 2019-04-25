<template>
    <div>
        <div class="row">
            <div class="row col-md-9 mt-4 ml-2">
                <div class="input-group mb-3 col-md-10">
                    <input class="form-control" type="text" v-model="filter" placeholder="Buscar por R.U.T., nombre o email">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="searchUsers">
                            <font-awesome-icon icon="search"/>
                        </button>
                    </div>
                    <span class="w-100"></span>
                    <small id="KeywordsHelpBlock" class=" text-muted">
                        Ingresar R.U.T. sin punto ni guion.
                    </small>
                </div> 
            </div>
            <div class="col-xs-12 col-md-3 mt-auto ml-auto">
                <button 
                    class="btn btn-primary mb-sm-2"
                    data-toggle="modal" 
                    data-target="#ModalNewUser"
                >    
                    <font-awesome-icon icon="user-md" /> Agregar Profesional
                </button>
            </div>
        </div>
        <div class="text-center" v-if="searching">                            
            <pulse-loader :loading="true" color="black"></pulse-loader>
        </div>
        <template v-if="resultsSearch != '' || resultsSearch === 0">
            <span><strong>{{resultsSearch.length}}</strong> resultado(s)</span>
            <button class="btn btn-warning" @click="clearSearch">Limpiar busqueda</button>
            <div v-if="resultsSearch === 0" class="alert alert-danger mt-4 text-center" role="alert">
                No hay resultados para esta busqueda.
            </div>
            <table v-if="resultsSearch !== 0" class="table table-bordered mt-2">
            <thead>
                <tr>
                    <th>R.U.T.</th>
                    <th>Nombres</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Dirección</th>
                    <th>Teléfonp</th>
                    <th>E-mail</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user,index) in resultsSearch" :key="index">
                    <td style="white-space:nowrap;">{{ formattedRut(user.rut) }}</td>
                    <td class="text-capitalize">{{ user.nombres }}</td>
                    <td class="text-capitalize">{{ user.apellido_p }}</td>
                    <td class="text-capitalize">{{ user.apellido_m }}</td>
                    <td class="text-capitalize">{{ user.direccion }}</td>
                    <td class="text-capitalize">{{ user.telefono }}</td>
                    <td>{{ user.email }}</td>
                    <td class="text-capitalize">{{ user.rol == 0 ? 'Administrador' : 'usuario' }}</td>
                    <td><span class="badge" :class="user.estado == 1 ? 'badge-success' : 'badge-warning'">
                            <span v-if="user.estado == 1">activo</span>
                            <span v-else>inactivo</span>
                        </span>
                    </td>
                    <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <!-- <button type="button" class="btn btn-primary">Editar</button> -->
                                <button
                                    v-if="user.estado == 1" 
                                    type="button" 
                                    class="btn btn-sm btn-success"
                                    data-toggle="modal" 
                                    data-target="#editUserModal"
                                    @click="editarUser(user)"
                                >Editar</button>
                                <button
                                    v-if="user.rol != 0 && user.estado == 1" 
                                    type="button" 
                                    class="btn btn-sm btn-danger"
                                    @click="deleteUser(user.id)"
                                >
                                 <template v-if="loadingDelete">
                                    <clip-loader :loading="true" size="12px" color="white"></clip-loader>
                                </template>
                                <template v-else>
                                    Eliminar
                                </template>
                                </button>
                                <button
                                    v-if="user.rol != 0 && user.estado == 0" 
                                    type="button" 
                                    class="btn btn-sm btn-success"
                                    @click="activarUser(user.id)"
                                >
                                <template v-if="loadingActivate">
                                    <clip-loader :loading="true" size="12px" color="white"></clip-loader>
                                </template>
                                <template v-else>
                                    Activar
                                </template>
                                </button>
                                 
                            </div>
                    </td>
                </tr>
            </tbody>
            </table>
        </template>
        <template v-else>
        <table class="table table-hover text-center mt-2">
            <thead>
            <tr>
                <th>R.U.T.</th>
                <th>Nombres</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Dirección</th>
                <th>Teléfonp</th>
                <th>E-mail</th>
                <th>Rol</th>
                <th>Estado</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <template v-if="loading">
                    <tr>
                        <td colspan="10" class="text-center">
                            <pulse-loader :loading="true" color="black"></pulse-loader>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(user,index) in users" :key="index">
                        <td style="white-space:nowrap;" class="text-capitalize">{{ formattedRut(user.rut) }}</td>
                        <td class="text-capitalize">{{ user.nombres }}</td>
                        <td class="text-capitalize">{{ user.apellido_p }}</td>
                        <td class="text-capitalize">{{ user.apellido_m }}</td>
                        <td class="text-capitalize">{{ user.direccion }}</td>
                        <td class="text-capitalize">{{ user.telefono }}</td>
                        <td>{{ user.email }}</td>
                        <td class="text-capitalize">{{ user.rol == 0 ? 'Administrador' : 'usuario' }}</td>
                        <td><span class="badge" :class="user.estado == 1 ? 'badge-success' : 'badge-warning'">
                            <span v-if="user.estado == 1">activo</span>
                            <span v-else>inactivo</span>
                            </span>
                        </td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <!-- <button type="button" class="btn btn-primary">Editar</button> -->
                                <button
                                    v-if="user.estado == 1" 
                                    type="button" 
                                    class="btn btn-sm btn-warning"
                                    data-toggle="modal" 
                                    data-target="#editUserModal"
                                    @click="editarUser(user)"
                                >
                                Editar
                                </button>
                                <button
                                    v-if="user.rol != 0 && user.estado == 1" 
                                    type="button" 
                                    class="btn btn-sm btn-danger"
                                    @click="deleteUser(user.id)"
                                >
                                <template v-if="loadingDelete">
                                    <clip-loader :loading="true" size="12px" color="white"></clip-loader>
                                </template>
                                <template v-else>
                                    Eliminar
                                </template>
                                </button>
                                <button
                                    v-if="user.rol != 0 && user.estado == 0" 
                                    type="button" 
                                    class="btn btn-sm btn-success"
                                    @click="activarUser(user.id)"
                                >
                                 <template v-if="loadingActivate">
                                    <clip-loader :loading="true" size="12px" color="white"></clip-loader>
                                </template>
                                <template v-else>
                                    Activar
                                </template>
                                </button>
                                
                            </div>
                        </td>

                    </tr>
                    <!-- <tr v-if="dataTable == '' && users != ''">
                        <td colspan="10" class="text-danger text-center">No hay información que coincida con la búsqueda.</td>
                    </tr> -->
                    <tr v-if="users == ''">
                        <td colspan="10" class="text-danger text-center">
                            No hay usuarios.
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <paginate
            v-if="totalPages > 1"
            v-model="page"
            :page-count="totalPages"
            :click-handler="getUsers"
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
        </template>
        <modal-new-user></modal-new-user>
        <edit-user-modal/>
    </div>
</template>

<script>
import ModalNewUser from './ModalNewUser'
import EditUserModal from './EditUserModal'
import {methods} from './Methods'
import { format } from 'rut.js'
export default {
    components : {
        'modal-new-user' : ModalNewUser,
        'edit-user-modal' : EditUserModal
    },
    data(){
        return{
            page : 1,
            totalPages : 0,
           filter : '',
           resultsSearch : [],
           users : [],
           loading : true,
           searching : false,
           loadingDelete : false,
           loadingActivate : false
        }
    },
    methods,
    computed : {
        userCreated(){
            return this.$store.getters.userCreated
        },
        
    },
    watch:{
        userCreated(){
            if(this.filter != ''){
                this.searchUsers()
            }else{
            this.loading = true
            this.getUsers()
            }
            
        }
    },
    mounted(){
        this.getUsers()
    }
}
</script>

<style scoped>

</style>
