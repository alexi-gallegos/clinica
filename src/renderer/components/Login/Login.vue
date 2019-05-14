<template>
    <div>
        <div class="col-md-6 mx-auto">
                    <h3 class="text-center">Ingresar al sistema</h3>
                    <div class="mt-4">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="E-mail" v-model="email" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Contraseña" v-model="password" />
                        </div>
                        <p v-if="errors != ''" class="text-danger">{{errors}}</p>
                        <div class="form-group text-center">
                            <button class="btn btn-primary btn-lg" 
                                    @click="login"
                                    @keyup.enter="login">
                                <template v-if="!loading">
                                    Ingresar
                                </template>
                                <template v-else>
                                    <pulse-loader :loading="true" color="white"></pulse-loader>
                                </template>
                            </button>
                            <!-- <button class="btn btn-success" 
                                    @click="createAdmin();createAllTratamientos();createPosiciones()"
                            > crear admin
                            </button> -->
                        </div>
                        <div class="form-group text-center">
                            <router-link :to="{name : 'forgotten'}">¿Olvidaste tu contraseña?</router-link>
                        </div>
                    </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            email : '',
            password : '',
            posiciones : [
                            { posicion : ['1.1','1.2','1.3','1.4'],
                              grupo : 1
                            },
                            { posicion : ['1.5','1.6','1.7','1.8'],
                              grupo : 2
                            },
                            { posicion : ['2.1','2.2','2.3','2.4'],
                              grupo : 1
                            },
                            { posicion : ['2.5','2.6','2.7','2.8'],
                              grupo : 2
                            },
                            { posicion : ['3.1','3.2','3.3','3.4'],
                              grupo : 1
                            },
                            { posicion : ['3.5','3.6','3.7','3.8'],
                              grupo : 2
                            },
                            { posicion : ['4.1','4.2','4.3','4.4'],
                              grupo : 1
                            },
                            { posicion : ['4.5','4.6','4.7','4.8'],
                              grupo : 2
                            },
                          
                          ],
            tratamientos : [
                {tratamiento : 'Barniz de flúor', valor : 20000},
                {tratamiento : 'Blanqueamiento completo', valor : 150000},
                {tratamiento : 'Carillas de composite', valor : 60000},
                {tratamiento : 'Carillas de porcelana', valor : 150000},
                {tratamiento : 'Cementación corona', valor : 30000},
                {tratamiento : 'Cementación provisorio', valor : 15000},
                {tratamiento : 'Cementación de corona definitiva', valor : 35000},
                {tratamiento : 'Cirugía de regulación de rebordes', valor : 60000},
                {tratamiento : 'Consulta + Receta', valor : 10000},
                {tratamiento : 'Corona metal porcelana + Perno colado', valor : 300000},
                {tratamiento : 'Coronas metal porcelana sin perno', valor : 280000},
                {tratamiento : 'Corona de zirconio', valor : 320000},
                {tratamiento : 'Destartraje', valor : 30000},
                {tratamiento : 'Destartraje completo (full)', valor : 40000},
                {tratamiento : 'Drenaje de absceso', valor : 30000},
                {tratamiento : 'Endodoncia', valor : 0},
                {tratamiento : 'Endodoncia incisivos y caninos', valor : 80000},
                {tratamiento : 'Endodoncia Premolares', valor : 95000},
                {tratamiento : 'Endodoncia Molares', valor : 140000},
                {tratamiento : 'Exodoncia simple', valor : 30000},
                {tratamiento : 'Exodoncia compleja', valor : 40000},
                {tratamiento : 'Exodoncia 3 molar semi incluido', valor : 100000},
                {tratamiento : 'Exodoncia diente temporal', valor : 25000},
                {tratamiento : 'Incrustación de resina', valor : 90000},
                {tratamiento : 'Mantenedor de espacio', valor : 50000},
                {tratamiento : 'Presupuesto', valor : 5000},
                {tratamiento : 'Presupuesto + Rx. Bitewing', valor : 15000},
                {tratamiento : 'Provisorio de acrilico', valor : 40000},
                {tratamiento : 'Prótesis removible acrilica', valor : 150000},
                {tratamiento : 'Prótesis parcial acrilica', valor : 150000},
                {tratamiento : 'Prótesis flexible', valor : 120000},
                {tratamiento : 'Prótesis removible metálica', valor : 250000},
                {tratamiento : 'Prótesis unilateral', valor : 120000},
                {tratamiento : 'Profilaxis', valor : 10000},
                {tratamiento : 'Pulpotomía + Restauración', valor : 55000},
                {tratamiento : 'Pulpotomía', valor : 30000},
                {tratamiento : 'Restauración (1 cara)', valor : 30000},
                {tratamiento : 'Restauración (2 cara)', valor : 30000},
                {tratamiento : 'Restauración (+3 cara)', valor : 35000},
                {tratamiento : 'Reconstitución', valor : 50000},
                {tratamiento : 'Reparación prótesis', valor : 30000},
                {tratamiento : 'Reparación prótesis + Diente extra', valor : 35000},
                {tratamiento : 'Restauración de vidrio ionómero', valor : 20000},
                {tratamiento : 'Rx. periapical', valor : 5000},
                {tratamiento : 'Rx. Bitewing Bilateral', valor : 10000},
                {tratamiento : 'Sellante', valor : 15000},
                {tratamiento : 'Técnica de cepillado', valor : 5000},
                {tratamiento : 'Trepanación de urgencia en Anteriores y Premolares', valor : 30000},
                {tratamiento : 'Trapanación de urgencia en molares', valor : 35000},
                {tratamiento : 'Retratamiento en incisivos, caninos y PM', valor : 100000},
                {tratamiento : 'Retratamiento en molares', valor : 160000},
                
                
            ],
            errors : [],
            loading : false
        }
    },
    methods: {
        createAdmin(){
            // let url = '/user/create_admin'

            // this.$http.get(url)
            //     .then(res => {
            //         console.log(res)
            //     }).catch(err => {
            //         console.log(err)
            //     })
        },
        createAllTratamientos(){
            // let url = '/tratamiento/create_all_tratamientos'

            // this.$http.post(url,{
            //     'tratamientos' : this.tratamientos
            // }).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
        },
        createPosiciones(){ // creacion de piezas dentales
            // let url = '/pieza_dental/create_all_piezas_dentales'

            // this.$http.post(url,{
            //     'posiciones' : this.posiciones
            // }).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
        },
        login(){
            let url = '/auth/login'
           
            if(this.email == '' || this.password == ''){
                this.errors = 'Por favor llene ambos campos.'
                return
            }
             this.loading = true
            this.errors = []
            this.$http.post(url,
            {   email : this.email,
                password : this.password}
            )
            .then(res => {
                this.$store.dispatch('setToken',res.data.access_token)
                this.$store.dispatch('setUserInfo',res.data.user)
                this.$router.push('/presupuesto')
                this.loading = false
            }).catch(err => {
                if(err.data.error){
                    this.loading = false
                    this.errors = err.data.error
                }
            });
        }
    },
    computed : {
       
    },
    mounted(){
            let self =this
            window.addEventListener('keyup', function(event) {
                if (event.keyCode === 13) { 
                    self.login()
                }
        })
    }
}
</script>