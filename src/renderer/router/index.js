import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/Login/Login').default,
      beforeEnter : (to,from,next) => {
          if(store.getters.token != null){
            next('/main')
          }else{
            next()
          }
      }
    },
    {
      path : '/main',
      name : 'main',
      component : require('@/components/Inicio/Main').default,
      children : [
              {
                path : '/users',
                name : 'users',
                meta : {requiresAuth : true},
                component : require('@/components/Users/Users').default,
                beforeEnter : (to,from,next) => {
                  if(store.getters.userInfo.rol == 0){
                    next()
                  }else{
                    next(false)
                  }
                }
              },
              {
                path : '/tratamientos',
                name : 'tratamientos',
                meta : {requiresAuth : true},
                component : require('@/components/Tratamientos/Tratamientos').default,
                beforeEnter : (to,from,next) => {
                  if(store.getters.userInfo.rol == 0){
                    next()
                  }else{
                    next(false)
                  }
                }
              },
              {
                path : '/piezas',
                name : 'piezasDentales',
                meta : {requiresAuth : true},
                component : require('@/components/PiezasDentales/PiezasDentales').default,
                beforeEnter : (to,from,next) => {
                  if(store.getters.userInfo.rol == 0){
                    next()
                  }else{
                    next(false)
                  }
                }
              },
              {
                path : '/presupuesto',
                name : 'presupuesto',
                meta : {requiresAuth : true},
                component : require('@/components/Presupuesto/Presupuesto').default,
                beforeEnter : (to,from,next) => {
                  if(store.getters.userInfo.rol == 0){
                    next()
                  }else{
                    next(false)
                  }
                }
              },
              {
                path : '/new-presupuesto',
                name : 'newPresupuesto',
                meta : {requiresAuth : true},
                component : require('@/components/Presupuesto/NewPresupuesto').default,
                beforeEnter : (to,from,next) => {
                  if(store.getters.userInfo.rol == 0){
                    next()
                  }else{
                    next(false)
                  }
                }
              },
              {
                path : '/pacientes',
                name : 'pacientes',
                meta : {requiresAuth : true},
                component : require('@/components/Pacientes/Pacientes').default,
                beforeEnter : (to,from,next) => {
                  if(store.getters.userInfo.rol == 0){
                    next()
                  }else{
                    next(false)
                  }
                },
                children : [
                  {
                    path : '/search',
                    name : 'searchPacientes',
                    meta : {requiresAuth : true},
                    component : require('@/components/Pacientes/SearchPacientes').default
                  }
                ]
              }
      ]
    },
    
    {
      path : '/forgotten',
      name : 'forgotten',
      component : require('@/components/ResetPassword/ResetPassword').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})



export default router


