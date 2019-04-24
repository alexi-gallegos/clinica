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


