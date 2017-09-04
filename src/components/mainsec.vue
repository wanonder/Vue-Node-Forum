<template>
  <div class="news-view view">
    <div class="news-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
       <a v-else class="disabled">more &gt;</a>
    </div>
    <transition :name="transition">
      <div class="news-list" >
        <transition-group tag="ul" name="item">
          <item v-for="item in ArticleList" :key="item._id" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import item from './../view/item'
import bus from './../assets/js/bus.js'
export default {
    data () {
        return {
           ArticleList:[],
           maxPage:1,
           transition: 'slide-right',
           pageSize:8,
           type:'hot'
        }
    },
   

    components:{
      item
    },
    computed:{
      page () {
      return Number(this.$route.params.page) || 1
       },
      hasMore () {
      return this.page < this.maxPage
      }  

    },
  
   beforeRouteUpdate (to,from,next){    

          next()    
          this.getArticleList();

      },

      mounted(){
        this.getArticleList();
      },

     created(){
        bus.$on('routeChange',(a)=>{
          this.type = a;
          this.getArticleList();
        })
     } ,

    methods: {
        getArticleList () {
           
          var param = {
             page:this.$route.params.page||1,
             pageSize:this.pageSize,
             sort:this.type
          }
           axios.post('/edit/getArticleList',param).then((result)=>{
               let res = result.data;
               this.ArticleList = res.result;
               this.maxPage = Math.ceil(res.msg / this.pageSize);
           })
        }

    }
}
</script>

<style scoped>
 
.news-view{
  padding-top: 45px;
}

.news-list-nav, .news-list {
  background-color: #fff;
  border-radius: 2px;
}
.news-list-nav {
  padding: 15px 30px;
  position: fixed;
  text-align: center;
  top: 55px;
  left: 0;
  right: 0;
  z-index: 998;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
}

.view {
 max-width:800px;
 margin:0 auto;
 position:relative
}


  a {
    margin: 0 1em;
  }
  .disabled {
    color: #ccc;
  }

.news-list {
  position: absolute;
  margin:30px 0;
  width: 100%;
  transition:all .5s cubic-bezier(.55,0,.1,1);
 } 

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

.item-move, .item-enter-active, .item-leave-active {
  transition:all .5s cubic-bezier(.55,0,.1,1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}

@media (max-width 600px) {
  .news-list{
    margin:10px 0;
  }
}
</style>



