export const methods = {

    editPiezaDental(info){
        this.$store.dispatch('piezaDentalEditInfo',info)
    },

    deletePiezaDental(id){
        let x = confirm('¿Seguro quieres eliminar este registro?')
        if(x){
            let url = '/pieza_dental/delete_pieza_dental'
            this.loadingDelete = true
            this.$http.post(url,{
                'id' : id
            }).then(res => {
                console.log(res)
                this.$notify({
                    group: 'foo',
                    type : 'success',
                    title: 'Bien',
                    text:  res.data.success
                })
                this.$store.dispatch('reloadTablePiezaDental')
            }).catch(err => {
                console.log(err)
                if(err.status == 404 || err.status == 403){
                    this.$notify({
                        group: 'foo',
                        type : 'warn',
                        title: 'Atención',
                        text: err.data.error
                    })
                }
            }).finally(() => {
                this.loadingDelete = false
            })
        }
    },
    getPiezasDentales(){
        let url = '/pieza_dental/get_piezas_dentales'

        this.$http.get(url)
            .then(res => {
                this.piezasDentales = res.data
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.loading = false
            })
    },
    sort(col) {
        // if you click the same label twice
        if(this.currentSort == col){
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }else{
          this.currentSort = col;
        } // end if
  
      }, // sort
};

export const computed = {
    reloadTable(){
        return this.$store.getters.reloadTablePiezaDental
    },
    table(){
        return this.piezasDentales.filter((piezaDental) => {
            return piezaDental.pieza_dental.toLowerCase().match(this.filter.toLowerCase())
        }).sort((a, b) => {
            if(this.currentSort == "pieza_dental"){
                if (this.currentSortDir === 'asc') {
                // return a[this.currentSort].toLowerCase() >= b[this.currentSort].toLowerCase();  
                    return a.pieza_dental.localeCompare(b.pieza_dental,{sensitivity : 'base'})
                }
                // return a[this.currentSort].toLowerCase() <= b[this.currentSort].toLowerCase();
                return b.pieza_dental.localeCompare(a.pieza_dental,{sensitivity : 'base'})

            }else{
                 if (this.currentSortDir === 'asc') {
                return a[this.currentSort] - b[this.currentSort];      
                }
                return b[this.currentSort] - a[this.currentSort]  ;
            }
           
        }) // sort
    },
};