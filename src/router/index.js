import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home'
import Login from './../view/log'
import Reg  from './../view/reg'
import Mainsec from './../components/mainsec'
import UserCom from './../components/usercom'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      components:{main:Mainsec}
    },
    {
      path:'/login',
      components:{main:Login}
    },
    {
      path:'/reg',
      components:{main:Reg}
    },
    {
      path:'user/:name',
      name:'UserRoute',
      components:{
        main:UserCom
      }
    }
  ]
})
