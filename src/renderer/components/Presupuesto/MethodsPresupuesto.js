export const methods = {
    
    getPresupuestos(){

        let url = '/presupuesto/get_presupuestos'

        this.$http.get(url)
            .then(res => {
                console.log(res)
                this.presupuestos = res.data
            }).catch(err => {
                console.log(err.response)
            })

    }

};