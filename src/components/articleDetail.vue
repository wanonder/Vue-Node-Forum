<template>
    <div class="article-container">
        <div class="article-header">
            <p>{{article.title}}</p>
            <span>发布于--{{article.createDate|formatDate}}-作者 <router-link :to="{name:'user',params:{username:article.author_name}}">{{article.author_name}}</router-link> --{{ article.visited_count}}次浏览</span>
        </div>
        <div class="article-main" v-html="article.content">
            
        </div>

       

        <div class="article-comment">
            <div class="comment-header">
               {{article.reply_count}}条 回复
            </div>  
                <li class="comment-item" v-for="(item,index) in comment">
                     
                    <span class="pic"><img :src="'/static/'+item.author_img" ></span>
                    <span class="name"><router-link :to="{name:'user',params:{username:item.author_name}}">{{item.author_name}}</router-link></span><span class="pos">{{index+1}}楼</span>
                    <span class="isAuthor" v-if="article.author_name==item.author_name">作者</span>
                    <br>
                    <span class="comment-content">
                       {{item.content}}
                    </span>
                  <div class="comment-meta">
                    <span class="comment-reply" @click="item.replyStatus=!item.replyStatus" :class="{active:item.replyStatus}">回复 </span>
                    <span class="praise"  v-if = "item.praise.indexOf(user) == -1"   @click="commentPraise(item,index,1)">赞({{item.praiseNum}})</span>
                    <span class="praised" v-else   @click="commentPraise(item,index,-1)">已赞({{item.praiseNum}})</span>
                    <span class="delete" v-if="user==article.author_name||user==item.author_name" @click="replyDelete(index)">删除</span>
                  </div>

                
                 
                
                  <div class="child-list">

                    <div class="child-comment" v-for="(reply,child_index) in item.reply">
                      <div v-if="reply.parent_id == comment[index]._id">
                       <span class="child-name">{{reply.author_name}}  :</span>
                       <span class="child-content">{{reply.content}}</span>
                      </div>
                      <div v-else>
                        <span class="child-name">{{reply.author_name}}</span>  回复  <span class="child-name">{{reply.parent_name}} :</span>
                        <span class="child-content"> {{reply.content}}</span>
                      </div>
                    <div class="child-comment-meta comment-meta">
                      <span class="comment-reply" @click="reply.replyStatus=!reply.replyStatus" :class="{active:reply.replyStatus}">回复 </span>
                      <span class="praise" v-if="reply.praise.indexOf(user)==-1" @click="childCommentPraise(reply,index,child_index,1)">赞({{reply.praiseNum}})</span>
                       <span class="praised" v-else   @click="childCommentPraise(reply,index,child_index,-1)">已赞({{reply.praiseNum}})</span>
                      <span class="   delete" v-if="user==reply.author_name||user==item.parent_name||user==article.author_name" @click="childReplyyDelete(index1,reply.parent_index)">删除</span>
                   </div>

                    
                    <div class="reply-box" v-if="reply.replyStatus">
                      <textarea v-model="reply.temp_content" :placeholder="'回复@'+reply.author_name+':'"></textarea>
                      <div class="child-btn" @click=" childCommentConfirm(index,child_index)">评  论</div>
                    </div>
                    

                 </div>  
                    
                     <div class="reply-box child-comment" v-if="item.replyStatus">
                      <textarea v-model="item.temp_content" placeholder="请输入你的观点"></textarea>
                      <div class="child-btn" @click="commentConfirm(index)">评  论</div>
                    </div>

                                             
                </div>
                   
                   
                
                   
                

                </li>
                <div class="comment-item active" v-if="comment.length==0">还没有评论，快来抢沙发吧！</div>
                 <div class="reply">
                   <textarea class="replyEdit" v-model="replyContent" placeholder="请输入你的评论"></textarea>
                    <span class="errorTip" v-if="errorStatus">评论输入不能为空</span>
                     <div class="reply-btn" @click="replyConfirm">确认回复</div>
                  </div>
        </div>
        


      <modal :mdShow="ErrorFlag" @close="ErrorFlag=false">
        <p >请先登录</p>
         <div class="login-wrap">
            <a href="javascript:void(0);" class="btn-login" @click="ErrorFlag=false">确 定</a>
          </div>
      </modal> 


    </div>
</template>

<script>
import axios from 'axios'
import {formatDate} from './../assets/js/date.js'
import modal from './Modal'
    export default {
        data () {
            return {
                article:{},
                comment:[],
                replyContent:'',
                errorStatus:false ,
                date:'',
                ErrorFlag:false,
                content:'',
                user:'',  
                ConfirmFlag:true
            }
        },   
        filters:{
            formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
         }
        } ,
        components:{
           modal
        },
        created() {
            this.fetchData();   
        },
        mounted() {
          this.user = document.cookie.split('=')[1]||'';
        },
        watched:{
          '$route': 'fetchData'
        },
        methods : {
          fetchData() {
             axios.post('/edit/getSingleArticle',{id:this.$route.params.id}).then((result)=>{
                let res= result.data
                this.article = res.result
                this.comment = res.result.comment
                
            })
          },

          replyConfirm() {
            if(!this.replyContent.replace(' ','')) {
                this.errorStatus = true;
                return;
            }
            
            axios.post('/edit/replypublish',{reply:this.replyContent,id:this.$route.params.id}).then((result)=>{
                let res = result.data;
                if(res.status == '0') {
                    this.replyContent='';
                    this.article = res.result;
                    this.comment = res.result.comment;
                } else {
                  this.ErrorFlag = true;
                }
            })

          },

          replyDelete (index) {
            axios.post('/edit/deleteReply',{id:this.$route.params.id,index:index}).then((result)=>{
              let res = result.data;
              this.article = res.result;
              this.comment = res.result.comment;
           })
          },


          commentConfirm (index) {
              
              axios.post('/edit/replypublish',
                {
                  id:this.$route.params.id,reply:this.comment[index].temp_content,
                  parent_name:this.comment[index].author_name,
                  index:index,
                  parent_id:this.comment[index]._id
                }).then((result)=>{
                    let res = result.data;
                    this.article = res.result;
                    this.comment = res.result.comment;
                })
          },

          childReplyyDelete(index,parent_index) {
            axios.post('/edit/deleteReply',{id:this.$route.params.id,index:index,parentIndex:parent_index,child:1}).then((result)=>{
              let res = result.data;
              this.article = res.result;
              this.comment = res.result.comment;
           })
          },

          childCommentConfirm (index,child_index) {
             axios.post('/edit/replypublish',
                {
                  id:this.$route.params.id,reply:this.comment[index].reply[child_index].temp_content,
                  parent_name:this.comment[index].reply[child_index].author_name,
                  index:index,
                  parent_id:this.comment[index].reply[child_index]._id,
                }).then((result)=>{
                    let res = result.data;
                    this.article = res.result;
                    this.comment = res.result.comment;
                })
          },


          commentPraise(item,index,num) {
            item.praiseNum = item.praiseNum+num;
            axios.post('/edit/praise',{id:this.$route.params.id,index:index,name:this.user,num:num}).then((result)=>{
              let res= result.data;    
              item.praise = res.result.comment[index].praise;
            })
           },

           childCommentPraise(item,index,child_index,num) {
            item.praiseNum = item.praiseNum+num;
            axios.post('/edit/praise',{id:this.$route.params.id,index:index,child_index:child_index,name:this.user,num:num,child:1}).then((result)=>{
              let res= result.data;
              item.praise = res.result.comment[index].reply[child_index].praise
            })
           }

        }
      }
            
</script>

<style scoped>
   .article-container {
    margin:20px auto;
    min-width: 800px;
   }

   .article-header {
      width: 100%;
      background-color:#fff;
      padding:25px 15px;
      border-bottom: 1px solid #ccc;
      border-radius: 3px;
   }

   .article-header p {
    font-size: 22px;
    font-weight: bold;
    color:#000;
   } 

   .article-header span {
    font-size: 12px;
    color: #ccc;
   }

   .article-main {
    width: 100%;
    background-color: #fff;
    padding: 25px 20px;
   }


   .article-comment {
    width: 100%;
    margin-top:20px;
   }

   .comment-header {
    padding:20px;
    background-color: rgb(246,246,246);
    height: 50px;
   }
   
 
   .comment-item{
     background-color: #fff;
     padding: 15px 30px 15px 80px;
     border-bottom: 1px solid #eee;
     position: relative;
     line-height: 20px;
     list-style: none;
   }

   .comment-item >.pic {
    float: left;
    margin-left:-50px;
    margin-top:15px;
   }

   .comment-item img {
      width: 30px;
      height: 34px;
   }

  .comment-meta {
     margin: 10px 0 0 0;
     font-size: 12px;
     color:#adadad;
     cursor: pointer;
  }

  .comment-meta > span:hover {
     color:#ff6600;
  }
   
  .comment-meta span {
    margin-right: 10px;
  }

  .active {
    font-size: 14px;
    color:black;
  }

  .comment-item .pos {
    margin-left: 10px;
    color:rgb(0,136,204);
   }

  
   .pos:hover {
     text-decoration: underline;
   }
   .comment-item .name {
    color:rgb(102,102,102);
    font-family: "Helvetica Neue";
    font-weight: 700
   }
   .reply {
      margin-top:30px;
    }
   .replyEdit {    
      height:120px;
      width: 320px;
   }

   .reply-btn {
    width: 120px;
    height: 40px;
    color:white;
    background-color: #ff6600;
    text-align: center;
    padding: 10px;
    margin: 10px 0 0 200px;
    cursor: pointer;
   }
   
   .reply-box {
    margin-top: 10px;
   }

   .reply-box  textarea{
      margin:0;
      padding:0;
      width: 584px;
      height:40px;

   }

   .child-btn {
     width: 80px;
     height:30px;
     background:#ff6600;
     text-align: center;
     padding: 5px;
     cursor: pointer;
     color:white;
     margin-left: 505px;
     border-radius: 4px;
     margin-top:5px;
   }

   .errorTip {
    font-size: 12px;
    color:red;
   }
   
   .isAuthor {
    background: rgb(107,168,78);
    padding: 2px;
    color: #fff;
    text-align: center;
   }

   .child-list {
    margin-top:10px;
     background: #eff0f2;
     width: 700px;
   }

   .child-comment {
    background: #eff0f2;
    padding:20px 5px 10px 10px;
    width: 700px;
    border-bottom: 1px solid #ccc;
   }
   
   .child-comment:last-child {
    border:none;
   }

   .child-comment .child-name {
    color:#24e5bf;
   }

   a:hover {
    text-decoration: underline;
   }
</style>
