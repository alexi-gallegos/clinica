<template>
    <div class="mt-2">
       <div v-if="loading" class="text-center">
            <pulse-loader :loading="true" color="black"></pulse-loader>
       </div>
       <div v-else>
           <div class="row">
               <div class="ml-3">
                   <span><strong>{{totalResults}}</strong> resultados.</span>
               </div>
                <div class="ml-auto">
                    <button class="btn btn-warning" @click="clearSearch">Limpiar búsqueda</button>
                </div>
           </div>
            <div v-if="loadingDelete" class="text-center">
                <pulse-loader :loading="true" color="black"></pulse-loader>
             </div>
           <div>
               <!-- {{results}} -->
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
                <template v-if="results != '' && !loadingTable">
                <tr v-for="(paciente,index) in results" :key="index">
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
                <template v-else-if="loadingTable">
                    <tr>
                        <td colspan="10">
                            <pulse-loader :loading="true" color="black"></pulse-loader>
                        </td>
                    </tr>
                </template>
                <template v-else-if="results == '' && !loadingTable">
                    <tr>
                        <td colspan="10">
                            <div class="alert alert-danger text-center" role="alert">
                                No hay resultados para esta busqueda.
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
            :click-handler="getResults"
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
           </div>
       </div>
       <modal-edit-paciente/>
    </div>
</template>
<script>
import {format} from 'rut.js'
import ModalEditPaciente from './ModalEditPaciente'
import {methods} from 'Methods'
export default {
    components : {
        'modal-edit-paciente' : ModalEditPaciente
    },
    data() {
        return {
            loading : true,
            loadingTable : false,
            loadingDelete : false,
            results : [],
            filter : '',
            totalResults : 0,
            page : 1,
            totalPages : 0,
        }
    },
    methods : {
        getResults(page = 1){
             let url = `/paciente/search_pacientes?page=${page}&filter=${this.search}`
             this.loadingTable = true
            console.log(url)
            this.$http.get(url)
            .then(res => {
                console.log(res)
                this.results = res.data.pacientes.data
                this.totalPages = res.data.pacientes.last_page
                this.totalResults = res.data.pacientes.total
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.loading = false
                this.loadingTable = false
            })
        },
        deletePaciente(id){
        let x = confirm('¿Seguro quieres eliminar este paciente?')
        if(x){
            let url = '/paciente/delete_paciente'
            this.loadingDelete = true
            this.$http.post(url,{
                'id' : id
            })
                .then(res => {
                    console.log(res)
                     this.$notify({
                        group: 'foo',
                        type : 'success',
                        title: 'Bien',
                        text: res.data.success
                    })
                this.$store.dispatch('searchPacientes',"")
                this.$router.push('/pacientes')                
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
                    this.loadingDelete = false
                })
        }
            },
            clearSearch(){
                this.$store.dispatch('searchPacientes',"")
                this.$router.push('/pacientes')
            },
        editPaciente(info){
        this.$store.dispatch('pacienteEditInfo',info)
        },
        formattedRut(rut){
        return format(rut)
    },
    },
    computed : {
        search(){
            return this.$store.getters.searchPacientes
        },
        reloadTable(){
            return this.$store.getters.reloadTableSearchPaciente
        }
    },
    watch : {
        search(){
            this.getResults(this.search)
        },
        reloadTable(){
            this.getResults(this.search)
        }
    },
    mounted(){
        if(this.$route.params.filter == undefined){
            this.$router.push('/pacientes')
            return
        }
        this.filter = this.$route.params.filter
        this.getResults()
    }
}
</script>