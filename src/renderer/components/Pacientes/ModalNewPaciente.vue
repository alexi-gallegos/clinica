<template>
<div class="modal fade" id="ModalNewPaciente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar Paciente</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="mt-2">
                <label>R.U.T. (*)</label>
                <input type="text" class="form-control" v-model="rut" placeholder="1234567-8">
            </div>
            <div class="mt-2">
                <label>Nombres (*)</label>
                <input type="text" class="form-control" v-model="nombres">
            </div>
            <div class="mt-2">
                <label>Apellido Paterno (*)</label>
                <input type="text" class="form-control" v-model="apellidoP">
            </div>
            <div class="mt-2">
                <label>Apellido Materno (*)</label>
                <input type="text" class="form-control" v-model="apellidoM">
            </div>
             <div class="mt-2">
                <label>Dirección</label>
                <input type="text" class="form-control" v-model="direccion">
            </div>
            <div class="mt-2">
                <label>Teléfono</label>
                <input type="text" class="form-control" v-model="telefono">
            </div>
            <div class="mt-2">
                <label>E-mail</label>
                <input type="email" class="form-control" v-model="email">
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success" @click="newPaciente">
            <template v-if="loading">
                <pulse-loader :loading="true" color="white"></pulse-loader>
            </template>
            <template v-else>
                Crear Paciente
            </template>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { methods } from './MethodsModalNewPaciente'
import { validate,clean } from 'rut.js'

export default {
    data() {
        return {
            loading : false,
            rut : '',
            nombres : '',
            apellidoP : '',
            apellidoM : '',
            direccion : '',
            telefono : '',
            email : '',
            validRut : false
        }
    },
    methods,
    computed : {
        cleanRut(){
            return clean(this.rut)
        }
    },
    watch : {
        rut(){
            this.validRut = validate(this.rut)
            console.log(this.validRut)
            return 
        }
    }
 }

</script>