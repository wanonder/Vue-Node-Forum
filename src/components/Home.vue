<template>
  <div class="container">
 <nav-header></nav-header>
 
   <div class="content">
     <keep-alive>
        <router-view name="main"></router-view>
     </keep-alive>
   </div> 
  </div>
</template>
<<script>
import navHeader from  '../view/navHeader'
export default {
  data ()  {
      return {

      }
  },
  components: {
      navHeader
  },
  methods: {
      
  }

}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
 body {
    font-size: 1.2rem;
    line-height: 1.5;
    background-color: #f7f7f7;
    padding:0;
    margin: 0;
}


.content {
  width: 45%;
  margin:80px auto;
}

a  {
  color :white;
  text-decoration:none;
}
</style>



