<template>
   <div class="main-sec">         
           <div class="main-title">
               <ul>
                   <li><a href="#">全部</a></li>
                   <li><a href="#">精华</a></li>
                   <li><a href="#">分享</a></li>
                   <li><a href="#">问答</a></li>
                   <li><a href="#">招聘</a></li>
               </ul>
           </div>
           <div class="main-content">
               <div class="main-article" v-for="(item,index) in articles"  :key=index>
                    <router-link :to='{name: "UserRoute",params:{name: item.author.loginname}}'>
                       <img :src='item.author.avatar_url' :title='item.author.loginname'>
                    </router-link>
                    <span class="article-reply"> {{item.reply_count}}/</span>
                    <span class="article-view">  {{item.visit_count}}</span>
                    <span class="article-title">{{item.title}}</span>
               </div>
           </div>
   </div>
</template>
<<script>
import axios from 'axios'
export default {
    data () {
        return {
            articles:[]
        }
    },
    mounted () {
        this.getArticles();
    },
    methods: {
        getArticles () {
            axios.get('https://cnodejs.org/api/v1/topics').then((result)=>{
                let res = result.data.data;
                this.articles = res;
            })
        }
    }
}
</script>

<style scoped>
  .main-sec {
      font-size: 12px;
  }
  .main-title {
      width: 100%;
      background: rgb(246, 246, 246);
      border: 1px solid rgb(222,222,222);
      border-radius: 3px;
      padding: 10px 0
  }
 
  .main-title ul {
    list-style: none;
  }
  .main-title ul li {
    display: inline-block;
    padding: 5px;
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: 2rem;
  }
   ul li a {
      color: green;
      text-decoration: none;
  }

  .main-content {
      width: 100%;
  }

  .main-article {
      width: 100%;
      height: 40px;
      background: rgba(255, 255, 255, .8);
      padding: 10px 0;
      border-bottom: 1px solid rgba(0, 0, 0,.1);
  }

  .article-reply {
      color: purple;
      font-size: 16px;
  }


</style>

