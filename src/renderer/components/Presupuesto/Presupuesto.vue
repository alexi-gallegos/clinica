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
                <router-link :to="{name : 'newPresupuesto'}"
                class="btn btn-primary mb-sm-2">
                        <font-awesome-icon icon="file-invoice-dollar" /> Crear Presupuesto
                </router-link>
            </div>
    </div>

    <div v-if="presupuestos.length > 0">
        <tabla :presupuestos="presupuestos"/>
    </div>
    <div class="mt-4" v-else>
        <pulse-loader :loading="true" color="black"></pulse-loader>
    </div>


    
</div>
</template>

<script>
import { methods } from './MethodsPresupuesto'
import Tabla from './Table' //TABLA PARA MOSTRAR DATOS DEL PRESUPUESTO
export default {
    data() {
        return {
            filter : '',
            presupuestos : []
        }
    },
    methods,
    mounted(){
        this.getPresupuestos()
        this.$store.dispatch('filtroTablaPresupuestos','')

    },
    components : {
        Tabla
    },
    watch : {
        presupuestos(){
            if(this.presupuestos.length > 0){
                $('#filter').prop('readonly', false);
            }else{
                $('#filter').prop('readonly', true);
            }
        },
        filter(){
            this.$store.dispatch('filtroTablaPresupuestos',this.filter)
        }
    }
}
</script>