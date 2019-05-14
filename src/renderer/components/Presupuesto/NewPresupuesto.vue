<template>
    <div class="mt-4">
         <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" v-model="showPaciente">
            <label 
                    class="form-check-label"
                    :class="errorPaciente ? 'error' : ''" 
                    for="inlineCheckbox1"
            >Mostrar Paciente</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" v-model="showProfesional">
            <label 
                    class="form-check-label" 
                    for="inlineCheckbox1"
                    :class="errorProfesional ? 'error' : ''"
            >Mostrar Profesional</label>
        </div>
        <!-- {{posicion}}
        {{piezaDental}} -->
        <!-- {{itemsPresupuesto}} -->
        <table class="table table-hover">
                <tbody>
                    <tr v-if="showPaciente">
                        <td>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for=""><strong>Paciente</strong></label>
                                    <model-list-select :list="options"
                                        v-model="item"
                                        option-value="id"
                                        :custom-text="rutAndName"
                                        placeholder="R.U.T. sin punto ni guion,nombres o apellidos."
                                        @searchchange="liveSearch">
                                    </model-list-select>
                                </div>
                                <div>
                                    <button class="btn btn-outline-success mt-4 ml-4"
                                            data-toggle="modal" 
                                            data-target="#ModalNewPaciente"
                                    >Crear Paciente</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="showProfesional">
                        <td>
                            <div class="row col-md-6">
                                <label for=""><strong>Profesional</strong></label>
                            <model-list-select :list="profesionales"
                                        v-model="profesional"
                                        option-value="id"
                                        :custom-text="rutAndName"
                                        placeholder="R.U.T. sin punto ni guion,nombres o apellidos."
                            >
                             </model-list-select>
                             </div>
                        </td>
                    </tr>
                    <tr>
                         <td>
                             <div class="ml-3">
                                    <strong>Seleccionar tratamiento</strong>
                            </div>
                            <div class="row mt-2">
                                <div class="d-inline col-md-4">
                                <model-list-select :list="tratamientos"
                                    v-model="itemTratamiento"
                                    option-value="id"
                                    option-text="tratamiento"
                                    placeholder="Buscar por nombre tratamiento"
                                >
                                </model-list-select>
                                </div>

                                <div class="col-md-4">
                                    <model-list-select 
                                        v-if="needsPiezaDental"
                                        :list="piezasDentales"
                                        v-model="piezaDental"
                                        option-value="id"
                                        option-text="pieza_dental"
                                        placeholder="Pieza Dental"
                                    >
                                    </model-list-select>
                                </div>
                                <div class="d-inline col-md-2">
                                    <button 
                                            class="btn btn-primary"
                                            @click="agregarTratamiento"
                                            style="white-space:nowrap;"
                                    >Agregar tratamiento
                                    </button>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <template v-if="loadingPositions">
                                        <clip-loader :loading="true" size="20px" color="black"></clip-loader>
                                    </template>
                                    <template v-else>
                                        <multi-list-select 
                                                    v-if="Object.keys(piezaDental).length !== 0 && positions.length > 0"
                                                    :list="positions"
                                                    :selected-items="posicion"
                                                    option-value="id"
                                                    option-text="posicion"
                                                    placeholder="..."
                                                    @select="onSelect"
                                        >
                                        </multi-list-select>
                                    </template>
                                   
                                </div>
                            </div> 
                        </td>
                    </tr>
                </tbody>
        </table>
             <div class="row">
                 <button 
                    v-if="showCreateButton"
                    class="btn btn-success ml-auto"
                    @click="createPresupuesto"        
                >
                    <template v-if="loading">
                        <pulse-loader :loading="true" color="white"></pulse-loader>
                    </template>
                    <template v-else>
                        Crear Presupuesto
                    </template>
                </button>
             </div>
        <table class="table table-hover text-center">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tratamiento</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Pieza Dental</th>
                    <th> Posiciones</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in itemsPresupuesto" :key="index">
                   <td>{{ index + 1}}</td>
                   <td>{{ item.tratamiento.tratamiento }}</td>
                   <td>${{ item.tratamiento.valor.toLocaleString() }}</td>
                   <td>
                       <template v-if="item.pieza_dental.id">
                           {{item.pieza_dental.pieza_dental}}
                       </template>
                        <template v-else>
                            -
                        </template>
                   </td>
                   <td style="white-space:normal;width:200px;">
                       <template v-for="(posicion,index) in item.posiciones">
                           <span :key="index">{{posicion.posicion}}
                           </span>
                           <span v-if="index+1 < item.posiciones.length">, </span>
                            
                       </template>
                    </td>
                   <td>
                       <button 
                            class="btn btn-danger btn-sm"
                            @click="deleteItem(index)"
                        >Eliminar</button>
                   </td>
                </tr>
                <tr>
                    <td colspan="4"> 

                    </td>
                    <td class="bg-success text-center">
                        Precio Total <strong>${{ totalPrice.toLocaleString() }}</strong>
                    </td> 
                </tr>
            </tbody>
        </table>
        <modal-new-paciente/>
    </div>
</template>

<script>
import {format} from 'rut.js'
 import { ModelListSelect, MultiListSelect } from 'vue-search-select'
import {methods} from './MethodsNewPresupuesto'
import ModalNewPaciente from '../Pacientes/ModalNewPaciente'
export default {
    data() {
        return {
        loading : false,
        errorProfesional : false,
        errorPaciente : false,
        loadingPositions : false,
        options : [], //opciones que se muestran en el select de pacientes
        tratamientos : [], // tratamientos que se muestran en el select
        item : {}, // paciente seleccionado
        itemTratamiento : {}, // tratamiento seleccionado
        itemsPresupuesto : [], // items que se muestran en la tabla 
        profesionales : [],
        posiciones : [], // array donde se guardan todas las posiciones
        posicion : [], // array donde se guardan las posiciones seleccionadas en el dropdown
        piezasDentales : [],
        piezaDental : {},
        profesional : {},
        lastSelectItem : {},
        needsPiezaDental : false, //mostrar o no el select de pieza dental
        showCreateButton : false,
        showPaciente : false, //mostrar input paciente
        showProfesional : false // mostrar input profesional
       
        }
    },
     methods: {
         ...methods,
             
        formatRut(rut){
            return format(rut)
        },
       
     
    },
    computed : {
        totalPrice(){
               let price = this.itemsPresupuesto.reduce((acc,obj) =>{
                   return acc + obj.tratamiento.valor
               },0)

               return price 
        },
        positions(){
            if(this.piezaDental.grupo == 1){
                const p = this.posiciones.filter(posicion => posicion.posicion != 'Oclusal')

                return p
            }else{
                const p = this.posiciones.filter(posicion => posicion.posicion != 'Incisal')

                return p
            }
        }

    },
    components: {
      ModelListSelect,
      MultiListSelect,
      ModalNewPaciente
    },
    watch:{
        itemTratamiento(){
            if(this.itemTratamiento.pieza_dental){
                this.needsPiezaDental = true
            }else{
                this.needsPiezaDental = false
                this.piezaDental = {}
            }
        },
        itemsPresupuesto(){
            if(this.itemsPresupuesto != ''){
                this.showCreateButton = true
            }else{
                this.showCreateButton = false
            }
        },
        piezaDental(){
            if(this.posiciones.length == 0 && Object.keys(this.piezaDental).length !== 0){
               this.getPosiciones()
           }
        }
    },
    mounted(){
        this.getTratamientos()
        this.getProfesionales()
        this.getPiezasDentales()

    }
}
</script>

<style>
.multiple.search .delete.icon:before {
	font-family: sans-serif;
	content: "x";
	font-style: normal; 
}

.error{
    color: red;
}

</style>
