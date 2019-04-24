<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <!-- <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
                 <font-awesome-icon icon="user" /> <span class="text-capitalize">{{user.name}}</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end hidden-xs" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link 
                        :to="{name : 'main'}" 
                        :class="this.$route.path == '/main' ? linkActivo : linkInactivo"
                    >Inicio</router-link>
                    <router-link 
                        v-if="user.rol == 0"
                        :to="{name : 'users'}" 
                        :class="this.$route.path == '/users' ? linkActivo : linkInactivo"
                    >Usuarios</router-link>
                    <a class="nav-item nav-link" href="#">Pricing</a>
                    <div class="dropdown-divider"></div>
                    <li id="link"><a class="nav-item nav-link" @click="logout">Cerrar sesión</a></li>
                </div>
            </div>
            </nav>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           linkActivo : 'nav-item nav-link active',
           linkInactivo : 'nav-item nav-link'
        }
    },
    methods : {
        logout(){
            let url = '/auth/logout'

            this.$http.post(url)
                .then(res => {
                    console.log(res)
                    this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/')
                    })
                }).catch(err => {
                    console.log(err)
                })
            
        }
    },
    computed : {
        user(){
            return this.$store.getters.userInfo
        }
    }
}
</script>

<style scoped>
.nav-item{
    text-align: right;
}
#link{
    cursor: pointer;
}
</style>
