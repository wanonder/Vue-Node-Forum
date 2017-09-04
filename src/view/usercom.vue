<template>
  <div class="user-page">
      <div class="user-info">
     <img-Input v-model="target"></img-Input>
        <div class="detail-info">
           <p class="username">{{infoList.userName}}</p>

          <p class="info-item"> 
           <span  class="cityinfo"  v-if="citys">城市：{{infoList.city}}  <a href="javascript:void" @click=" citys='' ">修改</a></span>
           <span  class="info-tip"  v-else-if="cityStatus" @click="cityStatus=false"> 填写城市信息: </span>
           <span  v-else> <input  v-model.lazy="infoList.city"    placeholder="城市名称" >  <button @click="infoConfirm('city')">确定</button> </span>
          </p>

          <p class="info-item">
            <span  class="cityinfo"  v-if="schools">学校：{{infoList.school}}  <a href="javascript:void" @click="schools=''">修改</a></span>
            <span  class="info-tip"  v-else-if="schoolStatus" @click="schoolStatus=false">填写学校信息: </span>
            <span  v-else><input v-model="infoList.school" placeholder="学校名称" >  <button @click="infoConfirm('school')">确定</button> </span>
          </p>

          <p class="info-item">
            <span  class="cityinfo"  v-if="githubs">github：{{infoList.github}}  <a href="javascript:void" @click="githubs=''">修改</a></span>
            <span   class="info-tip"  v-else-if="githubStatus" @click="githubStatus=false">填写github信息: </span>
            <span v-else> <input v-model="infoList.github"  placeholder="你的github地址" > <button @click="infoConfirm('github')">确定</button> </span>
          </p> 

          <p class="info-item">
            <span  class="cityinfo"  v-if="blogs">博客：{{infoList.blog}}  <a href="javascript:void" @click="blogs=''">修改</a></span>
           <span  class="info-tip" v-else-if="blogStatus" @click="blogStatus=false">填写博客信息: </span>
           <span v-else> <input v-model="infoList.blog" placeholder="你的博客"> <button @click="infoConfirm('blog')">确定</button>  </span>
          </p>

        </div> 
      </div>


      <div class="latest-topic">
          <div class="latest-header">
              <span>{{infoList.userName}}  最近创建的话题</span>
          </div>
           <li class="latest-item" v-for="item in articleList" :key="item._id" >
              <span class="pic"><img :src="'/static/'+item.author_img"></span>

              <span class="title">
              <router-link :to="{ name: 'article', params:{ id: item._id }}">{{ item.title }}</router-link>
             </span><br>
              <span class="meta">
                  <span  class="by">
             by <router-link :to="{name:'user',params:{username:item.author_name}}">{{ item.author_name }}</router-link>
                   </span>
            </span>
        </li>   
      </div>
  </div>
</template>
<script>
import axios from 'axios';
import imgInput from '../imgInput'
export default {
     data () {

         return {  
              infoList: {},
              articleList:[],
              blogStatus:true,
              schoolStatus:true, 
              githubStatus:true,
              cityStatus:true,
              citys:'',
              schools:'',
              githubs:'',
              blogs:''        
          }
        },
     watch: {
     '$route': 'fetchUserData'
    },
    components:{
     imgInput
    },
    mounted () {
      
    },
    created() {
     this.fetchUserData(); 
     this.fetchArticleData(); 
    },

    methods: {

      init () {
        this.citys = this.infoList.city;
        this.schools = this.infoList.school,
        this.jobs = this.infoList.job,
        this.posts = this.infoList.post,
        this.companys = this.infoList.company,
        this.githubs = this.infoList.github,
        this.blogs = this.infoList.blog 
      },

   /*保存用户填入的数据*/
    infoConfirm (item) {
      this[item+'s'] = this.infoList[item];
      if( !this.infoList[item] ) {
          this[item+'Status'] = true;
          return 
      }
      var param = {[item]:this.infoList[item],'username':this.$route.params.username};
      axios.post('/users/saveUserInfo',param);
    }
   ,


     /*拿到用户数据*/
     fetchUserData() {
       axios.post('/users/getuserInfo', {'username':this.$route.params.username }).then( (result)=> {
            let res= result.data;
            if(res.result) {
            this.infoList = res.result;
            this.init();
          }  
       })  
       
     },

      /*拿到文章数据*/
    fetchArticleData() {
      axios.post('/edit/getArticlesByParam',{author_name:this.$route.params.username}).then((result)=>{
        let res= result.data;
        this.articleList.push(res.result);
      })
    }
  }
}
</script>

<style scoped>
.user-page {
    margin-top: 20px;

}

.user-info {
    background-color: #fff;
    border:1px solid #eee;
    border-radius:3px;
    padding:10px;
    overflow: hidden;
     box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px 0px;
}
.user-info img {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 8px;
    float:left;
    margin-left: 25px;
}

 .info-item {
    margin-top: 20px;
    min-width: 600px;  
    display: flex;
}


.info-item .info-tip {
 padding:5px;
 color:#0066cc;
 flex:1;
 cursor: pointer;
}

.info-item .info-tip :hover {
 text-decoration: underline;
}

.info-item input {
    height:30px;
    flex:2;
    text-align: center;
}

.info-item button {
    width:60px;
    height:30px;
    color:#fff;
    background-color:#ff6600;
    border-radius: 3px; 
    flex:1;
    margin-left: 10px;
}

.username {
    font-size:24px;
    font-weight: bold;
}


.detail-info {
    display: inline-block;
    margin-left:70px;

}

.latest-topic {
    margin-top: 20px;
}

.latest-topic li {
  list-style: none;
}

.latest-header {
    padding:20px;
    background-color: rgb(246,246,246);
    height: 50px;
    border-bottom:1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 1px 2px 0px;
  
}

.latest-item {
  background-color: #fff;
  padding: 15px 30px 15px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.latest-item  .pic {
    position: absolute;
    top: 50%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -15px;
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
