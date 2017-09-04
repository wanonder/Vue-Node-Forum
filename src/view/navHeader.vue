<template>
  
   <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="../assets/logo.png" alt="logo">
        </router-link>
        <router-link to="/hot">热帖</router-link>
        <router-link to="/new">最新</router-link>
        <a href="javascript:void(0)" @click="edit">写帖子</a>
      <span class="nav-log-reg">     
        <router-link :to="{name:'user',params:{username:nickName}}"  v-if="nickName"> 
         <span  class="header-info">
          <img :src="'/static/'+nickImg"> 
          {{nickName}}       
          </span>
        </router-link>
        </span>
        <a href="javascript:void(0)" v-if="!nickName"  @click="loginModalFlag=true">登录</a>
        <a href="javascript:void(0)" v-if="!nickName"  @click="regModalFlag=true">注册</a>
        <a href="javascript:void(0)" v-if="nickName"   @click="logOut">退出</a>
      </span> 
        <a class="github" href="javascript:void(0)" target="_blank" rel="noopener">
          Built with Vue-Node
        </a>
        
      </nav>
      <modal :mdShow="loginModalFlag"  @close="loginModalFlag=false">
         <log-form  @has-log="loginIn"></log-form>
      </modal>

      <modal :mdShow="regModalFlag"  @close="regModalFlag=false">
         <reg-form  @has-reg="regIn"></reg-form>
      </modal>

      <modal :mdShow="ErrorFlag" @close="ErrorFlag=false">
        <p>请先登录!</p>
         <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="ErrorFlag=false">确 定</a>
          </div>
      </modal> 
  </header>
  
</template>
<script>
import './../assets/css/login.css'
import './../assets/css/base.css'
import axios from 'axios'
import modal  from './../components/Modal'
import logForm from './logForm'
import regForm from './regForm'
import bus from './../assets/js/bus.js'

export default {
  data () {
      return {
          loginModalFlag:false,
          nickName:'',
          nickImg:'',
          regModalFlag:false,
          ErrorFlag:false
      }
  },
  components:{
      modal,
      logForm,
      regForm
  },
  mounted (){
    this.checkLogin();
  },

  watch: {
    '$route' (to, from) {

       if((to.name==='hot'&&from.name==='new')||(to.name==='new'&&from.name==="hot")){
          bus.$emit("routeChange",this.$route.name);
       }
     
    }
  }
   
  
  ,
  methods: {
     checkLogin(){
      axios.get("/users/checkLogin").then((response)=>{
      var res = response.data;
      var path = this.$route.pathname;
      if(res.status === "0"){
      this.nickName = res.result.name;
      this.nickImg = res.result.img;
      } 
    });
  } ,

    loginIn (data) {
         this.loginModalFlag = false;
         this.nickName = data.result.userName;
    },

    regIn (data) {
         this.regModalFlag = false;
         this.nickName = data.result.userName;
    },
    logOut () {
      axios.post("/users/logout").then((response)=>{
          let res = response.data;
            if(res.status=="0"){
            this.nickName = '';  
          }
        })
    }
 ,
    edit () {
      axios.get('/edit/check').then((result)=>{
        let res = result.data;
        if(res.result === "suc") {
           this.$router.push('/editArticle');
        } else {
         this.ErrorFlag = true;
         this.$(router).push('/hot');
        }
      }) 
    }
  }
}
</script>
<style scoped>
a {
  color: #34495e;
  text-decoration: none;
}
.header {
  background-color:#ff6600;
  position: fixed;
  z-index: 10000;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;
}

.inner {
    max-width: 900px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;
     
  }

a {
    color:rgba(255, 255, 255, .8); 
    line-height:24px; 
    transition:color .15s ease;
    display:inline-block;
    vertical-align:middle; 
    font-weight: 300;
    letter-spacing:.075em; 
    margin-right:1.8em; 
}
  
a:hover {
   color:  #fff;
}

.router-link-active {
  color:#fff;
/*   font-weight:400; */
}

.nav-log-reg {
  margin-left:250px;
}

.nav-log-reg img {
  width: 30px;
  height: 30px;
  border-radius:50%;
  position: absolute;
  top:-2px;
  right:67px;
 
}
 
.github{
    color: #fff;
    font-size: .9em;
    margin: 0;
    float: right;
}
.logo {
  width: 24px;
  margin-right:10px;
  display: inline-block;
  vertical-align: middle;
}


.header-info {
  cursor: pointer;
  position:relative;
  width: 100px;
}





</style>

