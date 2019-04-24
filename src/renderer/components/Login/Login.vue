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
                            <button class="btn btn-primary btn-lg" @click="login">
                                <template v-if="!loading">
                                    Ingresar
                                </template>
                                <template v-else>
                                    <pulse-loader :loading="true" color="white"></pulse-loader>
                                </template>
                            </button>
                            <button class="btn btn-success" @click="createAdmin"> crear admin</button>
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
            errors : [],
            loading : false
        }
    },
    methods: {
        createAdmin(){
            let url = '/user/create_admin'

            this.$http.get(url)
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err.response)
                })
        },
        login(){
            let url = '/auth/login'
            this.loading = true
            this.errors = []
            if(this.email == '' || this.password == ''){
                this.errors = 'Por favor llene ambos campos.'
                return
            }
            this.$http.post(url,
            {   email : this.email,
                password : this.password}
            )
            .then(res => {
                this.$store.dispatch('setToken',res.data.access_token)
                this.$store.dispatch('setUserInfo',res.data.user)
                this.$router.push('/main')
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
       
    }
}
</script>