<template>
  <li class="news-item">
    <span class="pic"><img :src="'/static/'+item.author_img"></span>
    <span class="title">
        <router-link  :to="{ name: 'article', params:{ id: item._id }}">{{ item.title }}</router-link>
    </span>
    <br>
    <span class="meta">
      <span  class="by">
        by <router-link :to="{name:'user',params:{username:item.author_name}}">{{ item.author_name }}</router-link>
      </span>
       <span class="time">
      {{ item.createDate | formatDate}} | 
    </span> 
       <span  class="comments-link">
       <!-- <router-link :to="'/item/' + item.id">{{ item.comment}} comments</router-link> -->
       {{item.reply_count}}comments
           </span> 
    </span>
  </li>
</template>

<script>
import {formatDate} from './../assets/js/date.js'
export default {
  name: 'news-item',
  props: ['item'],
  filters:{
  formatDate(time) {
    var date = new Date(time);
     return formatDate(date, 'yyyy-MM-dd hh:mm');
   }    
    } ,
}
</script>

<style scoped>
.news-item {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.pic {
    position: absolute;
    top: 50%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -18px;
  }

.title {
     font-size:16px;
    font-family: "Helvetica Neue";
    font-weight: 700
}

.pic img {
    width: 40px;
    height: 40px;
  }

.meta,.host{
    font-size: .85em;
    color: #828282;
 }

a {
  color:#828282;
  text-decoration: underline;
 }
a:hover {
  color:#ff6600;
}  

</style>
