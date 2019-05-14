import {format} from 'rut.js'
export const methods = {
    createPresupuesto(){
        this.errorPaciente = false
        this.errorProfesional = false
        if(Object.keys(this.profesional).length === 0){
            this.errorProfesional = true
             this.$notify({
               group: 'foo',
               type : 'warn',
               title: 'Atención',
               text: 'Seleccione Profesional, por favor.'
               })
               return
        }
        if(Object.keys(this.item).length === 0){
            this.errorPaciente = true
            this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Atención',
                text: 'Seleccione Paciente, por favor.'
                })
                return
        }
        this.loading = true
        
        let url = '/presupuesto/new_presupuesto'
        
        this.$http.post(url,{
            'presupuesto' : this.itemsPresupuesto,
            'paciente' : this.item.id,
            'profesional' : this.profesional.id,
            'valor_total' : this.totalPrice
        })
           .then(res => {
               console.log(res)
               this.$notify({
                group: 'foo',
                type : 'success',
                title: 'Bien',
                text:  'Presupuesto creado.'
            })
            this.$router.push({name : 'presupuesto'})
           }).catch(err => {
               console.log(err.response)
           }).finally(() => {
               this.loading = false
           })
    }, 
    onSelect(items, lastSelectItem) {
        this.posicion = items
        this.lastSelectItem = lastSelectItem
    },
 
 deleteItem(id){
     this.itemsPresupuesto.splice(id,1)
 },
 
rutAndName(paciente){
    return `${format(paciente.rut)} - ${paciente.nombres} ${paciente.apellido_p} ${paciente.apellido_m}`
},
getPosiciones(){
    let url = '/posicion/get_posiciones'
    this.loadingPositions = true
    this.$http.get(url)
        .then(res => {
            console.log(res)
            this.posiciones = res.data
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.loadingPositions = false
        })
},
    getTratamientos(){
        let url = '/tratamiento/get_tratamientos'

        this.$http.get(url)
            .then(res => {
                this.tratamientos = res.data.tratamientos
            }).catch(err => {
                console.log(err)
            }).finally(() => {

            })
    },
    getProfesionales(){
        let url = '/user/get_all_users'

        this.$http.get(url)
            .then(res => {
                console.log(res)
                this.profesionales = res.data
            }).catch(err => {
                console.log(err)
            })
    },
    liveSearch(value){
        if(value != ''){
        let url = `/paciente/live_search_paciente?filter=${value}`

        this.$http.get(url)
           .then(res => {
               this.options = res.data
           }).catch(err => {
               console.log(err)
           }).finally(() => {

           })
       }

   },
   getPiezasDentales(){
    let url = '/pieza_dental/get_piezas_dentales'

    this.$http.get(url)
       .then(res => {
           console.log(res)
           this.piezasDentales = res.data
       }).catch(err => {
           console.log(err)
       }).finally(() => {
           
       })
},
agregarTratamiento(){
    if(Object.keys(this.itemTratamiento).length === 0){
        this.$notify({
            group: 'foo',
            type : 'warn',
            title: 'Atención',
            text: 'Seleccione un tratamiento, por favor.'
            })
            return
    }
    if(this.needsPiezaDental == true && Object.keys(this.piezaDental).length === 0){
        this.$notify({
       group: 'foo',
       type : 'warn',
       title: 'Atención',
       text: 'Seleccione una pieza dental.'
       })
       return
    }
    this.itemsPresupuesto.push({
                                   'tratamiento' : this.itemTratamiento,
                                   'pieza_dental' : this.piezaDental,
                                   'posiciones' : this.posicion
    })

    this.itemTratamiento = {}
    this.piezaDental = {}
    this.posicion = []
},
}