<template>
    <div>
        <div class="row mt-4 ml-2">
            <input 
                    class="form-control col-xs-8 col-md-6 col-lg-4 ml-2 mb-sm-2" 
                    type="text" 
                    placeholder="Buscar por nombre o email"
                    v-model="filter"
            />
            <button 
                class="btn btn-primary col-xs-10 col-md-3 ml-auto mb-sm-2"
                data-toggle="modal" 
                data-target="#ModalNewUser"
            >    
                <font-awesome-icon icon="user-md" /> Agregar Profesional
            </button>
        </div>          
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
                    <tr v-for="(user,index) in dataTable" :key="index">
                        <td>{{ user.rut }}</td>
                        <td>{{ user.nombres }}</td>
                        <td>{{ user.apellido_p }}</td>
                        <td>{{ user.apellido_m }}</td>
                        <td>{{ user.direccion }}</td>
                        <td>{{ user.telefono }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.rol == 0 ? 'Administrador' : 'usuario' }}</td>
                        <td><span class="badge" :class="user.estado == 1 ? 'badge-success' : 'badge-warning'">
                            <span v-if="user.estado == 1">activo</span>
                            <span v-else>inactivo</span>
                            </span>
                        </td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <!-- <button type="button" class="btn btn-primary">Editar</button> -->
                                <button
                                    v-if="user.rol != 0 && user.estado == 1" 
                                    type="button" 
                                    class="btn btn-sm btn-danger"
                                    @click="deleteUser(user.id)"
                                >Eliminar</button>
                                <button
                                    v-if="user.rol != 0 && user.estado == 0" 
                                    type="button" 
                                    class="btn btn-sm btn-success"
                                    @click="activarUser(user.id)"
                                >Activar</button>
                            </div>
                        </td>

                    </tr>
                    <tr v-if="dataTable == '' && users != ''">
                        <td colspan="2" class="text-danger text-center">No hay información que coincida con la búsqueda.</td>
                    </tr>
                    <tr v-if="users == ''">
                        <td colspan="2" class="text-danger text-center">
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
        <modal-new-user></modal-new-user>
    </div>
</template>

<script>
import ModalNewUser from './ModalNewUser'
import {methods} from './Methods'
export default {
    components : {
        'modal-new-user' : ModalNewUser
    },
    data(){
        return{
            page : 1,
            totalPages : 0,
           filter : '',
           users : [],
           loading : true
        }
    },
    methods,
    computed : {
        dataTable(){
            return this.users.filter((user) => {
                return user.nombres.match(this.filter) || user.email.match(this.filter)
            })
        },
        userCreated(){
            return this.$store.getters.userCreated
        }
    },
    watch:{
        userCreated(){
            this.loading = true
            this.getUsers()
        }
    },
    mounted(){
        this.getUsers()
    }
}
</script>

<style scoped>

</style>
