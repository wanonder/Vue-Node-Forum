<template>
  <header>
    <nav class="main">
           <a href="#" class="brand"><img src="img/" alt=""></a>
           <form action="https://cn.bing.com/search" target="_blank">
             <input type="text" >
             <input type="submit" value="" >
        </form>
          
                <!--   <li><router-link ><router-link></li>
                   <router-link >新手入门</router-link> -->
                  <router-link :to="{path:'/reg'}" >注册</router-link>
                  <router-link :to="{ path:'/login'}">登录</router-link> 
           
        </nav>
  </header>
</template>
<<script>
export default {
  data () {
      return {
          list:['首页','新手入门','注册','登录']
      }
  }
}
</script>
<style scoped>
header {
    width: 100%;
    background: rgb(68, 68, 68);
    position: fixed;
    z-index: 999;
    height: 55px;
    top: 0;
    left :0;
    right: 0;
}
header .main .brand {
    float: left;
    padding: .5rem .5rem 0;
}


header .main {
    max-width: 45%;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;
}

header .main  a {
    display: inline-block;
    padding: 0 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #7c7a65;
    text-decoration: none;
}

header .main  a:hover,
header .main  a:active,
header .main  a.active {
    color: #ffb300;
    background-color: #f8f6f1;
}

  input[type="submit"] {
    background: url("../assets/search-button.png") ;
    width: 29px;
    height: 29px;
    border:0;
    float: left;
    
  }

  input[type="text"] {
    height: 25px;
    width: 350px;
    line-height: 25px;
    border:0;
    outline: none;
    float: left;
  }

</style>

