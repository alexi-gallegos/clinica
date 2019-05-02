
export const methods = {
   
    getTratamientos(){
        let url = '/tratamiento/get_tratamientos'

        this.$http.get(url)
            .then(res => {
                this.tratamientos = res.data.tratamientos
            }).catch(err => {
            }).finally(() => {
                this.loading = false
            })
    },
    deleteTratamiento(id){
          let x = confirm("¿Seguro quieres eliminar este registro?")
          if(x){
            this.loadingDelete = true
            let url = '/tratamiento/delete_tratamiento'

            this.$http.post(url,{
              'id' : id
            }).then(res => {
              console.log(res)
              this.$notify({
                group: 'foo',
                type : 'success',
                title: 'Bien',
                text: res.data.success
            })
            }).catch(err => {
              console.log(err)
              if(err.status == 404){
                this.$notify({
                  group: 'foo',
                  type : 'error',
                  title: 'Error',
                  text: err.data.error
              })
              }
            }).finally(() => {
              this.getTratamientos()
              this.loadingDelete = false
            })
            
          }
    },
    editTratamiento(infoTratamiento){
       this.$store.dispatch('tratamientoEditInfo',infoTratamiento)
    },
    sort(col) {
        // if you click the same label twice
        if(this.currentSort == col){
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }else{
          this.currentSort = col;
        } // end if
  
      }, // sort
}