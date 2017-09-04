<template>
  <div class="container">
 <nav-header></nav-header>
 
   <div class="content">
        <router-view ></router-view>
   </div> 
   <main-footer></main-footer>
  </div>
</template>
<script>
import navHeader from  '../view/navHeader'
import mainFooter from './mainFooter'
export default {
  data ()  {
      return {

      }
  },
  components: {
      navHeader,
      mainFooter
  }
}
</script>

<style>
body {
  font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size :14px;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  padding-top:55px;
  color: #34495e;
  overflow-y:scroll;
}

li {
  list-style: none;
}



</style>



