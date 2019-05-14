import {format} from 'rut.js'
export const methods = {
    searchPacientes(){
        if(this.filter == ''){
            this.$notify({
                group: 'foo',
                type : 'warn',
                title: 'Atención',
                text: 'Ingrese una palabra para buscar.'
            })
            return
        }
        this.$router.push({name : 'searchPacientes',params : {filter : this.filter}})
        this.$store.dispatch('searchPacientes',this.filter)
       
    },
    formattedRut(rut){
        return format(rut)
    },
    // 
    getPacientesPaginate(page = 1){
        let url = `/paciente/get_pacientes?page=${page}`
        this.loading = true
        this.$http.get(url)
            .then(res => {
                this.pacientes = res.data.data
                this.totalPages = res.data.last_page
            }).catch(err => {
            }).finally(() => {
                this.loading = false
            })
    },
    deletePaciente(id){
        let x = confirm('¿Seguro quieres eliminar este paciente?')
        if(x){
            let url = '/paciente/delete_paciente'
            this.loadingButtons = true
            this.$http.post(url,{
                'id' : id
            })
                .then(res => {
                    console.log(res)
                    this.$store.dispatch('reloadTablePaciente')
                    this.$notify({
                        group: 'foo',
                        type : 'success',
                        title: 'Bien',
                        text: res.data.success
                    })
                }).catch(err => {
                    if(err.status == 404 || err.status == 403){
                        this.$notify({
                            group: 'foo',
                            type : 'error',
                            title: 'Error',
                            text: err.data.error
                        })
                    }
                }).finally(() => {
                    this.loadingButtons = false
                })
        }
    },
    editPaciente(info){
        this.$store.dispatch('pacienteEditInfo',info)
    }
}