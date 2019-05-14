<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="../../assets/clinica_logo.png" width="50" height="50" class="d-inline-block align-top" alt="">
                <template v-if="user.rol == 0">
                    <font-awesome-icon class="offset-md-2 mt-4" icon="user-tie" /> <span class="text-capitalize ml-2 mt-4">{{user.nombres}} {{user.apellido_p}}</span>
                </template>
                <template v-else>
                    <font-awesome-icon class="offset-md-2 mt-4"  icon="user" /> <span class="text-capitalize ml-2 mt-4">{{user.nombres}} {{user}}</span>
                </template>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end hidden-xs" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link 
                        :to="{name : 'presupuesto'}" 
                        :class="this.$route.path == '/presupuesto' || this.$route.path == '/new-presupuesto' ? linkActivo : linkInactivo"
                        >Presupuesto
                    </router-link>
                    <router-link 
                        v-if="user.rol == 0"
                        :to="{name : 'users'}" 
                        :class="this.$route.path == '/users' ? linkActivo : linkInactivo"
                        >Profesionales
                    </router-link>
                     <router-link 
                        v-if="user.rol == 0"
                        :to="{name : 'pacientes'}" 
                        :class="this.$route.path == '/pacientes' ? linkActivo : linkInactivo"
                        >Pacientes
                    </router-link>
                     <div class="dropdown">
                        <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown">
                            Presupuesto
                        </button>
                        <div class="dropdown-menu">
                            <router-link :to="{name : 'tratamientos'}" 
                                    class="dropdown-item"
                                    :class="this.$route.path == '/tratamientos' ? 'active' : ''">
                                Tratamientos
                            </router-link>
                            <router-link :to="{name : 'piezasDentales'}" 
                                    class="dropdown-item"
                                    :class="this.$route.path == '/piezas' ? 'active' : ''">
                                Piezas dentales
                            </router-link>                            
                        </div>
                    </div> 
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
.dropdown{
    text-align: right;
}
.dropdown-menu{
    text-align: inherit;
}

.dropdown-menu {
    width: 70px;
    /* height: 120px; */
    margin-left: auto;
}
#link{
    cursor: pointer;
}
@media (min-width: 992px){
.navbar-expand-lg .navbar-nav .dropdown-menu {
    position: absolute;
    text-align: left;
    }
.navbar-light .navbar-nav .show > .nav-link, .navbar-light .navbar-nav .active > .nav-link, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .nav-link.active{
    border-bottom: 2px solid;
    border-color: rgb(53, 80, 170);
}
}

</style>
