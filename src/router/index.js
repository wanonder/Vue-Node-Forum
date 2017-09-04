import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home'
import Mainsec from './../components/mainsec'
import Reg from './../view/reg';
import UserCom from './../components/usercom'
import EditArticle from './../components/editArticle'
import article from './../components/articleDetail'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/new',
    },
    {
      path:'/new/:page(\\d+)?',
      name:'new',
      component:Mainsec,

    },
    {
      path:'/hot/:page(\\d+)?',
      name:'hot',
      component:Mainsec
    },
    {
      path:'/editArticle',
      component:EditArticle
    },
    {
        path:'/article/:id',
        name: 'article',
        component:article
    },
    {
      path:'/user/:username',
      name:'user',
      component: UserCom
    }
  ]
})
