<template>
  <div class="editor-container">
    <div class="editor-title">帖子标题</div>
    <input type="text" v-model="title" @focus ="this.errorStatus=false" placeholder="请输入帖子标题">
    <span class="errorTip" v-if="errorStatus"> 标题或内容不得为空！</span>
    <div id="editor-circle">
        <mavon-editor style="height: 100%" v-model='value'   @change="$change"></mavon-editor>
    </div>
    <div class="editor-btn" @click="publish">确 定 发 表</div>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios';
  export default {
    data () {
      return {
        value:'',
        errorStatus:false,
        title:'',
        htmlcode:''
      }
    },
    components:{
      mavonEditor
    },
    methods:{
      publish () {
          if(this.title=== '' || this.values=== '') {
             this.errorStatus = true
             return 
          } 

          axios.post('/edit/publish',
            {
            title:this.title,
            content:'<div class="content">'+this.htmlcode+"</div>",
            createDate:Date.now()
           }
         ).then((result)=>{
          let res = result.data;
          if(res.result == 'suc') {
             alert("发表成功！")
             this.value = '';
             this.title = '';
             this.$router.push('hot');
           }
         }) 
      },
      $change (status,val) {
        status = true;
        this.htmlcode = val;
      }
    }

  }
</script>

<style>
  .editor-container {
    margin-top:20px;
  }
  .editor-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;

  }

  input[type=text] {
    width: 300px
  }

 #editor-circle {
    margin:30px auto;
    width: 100%;
    height: 580px;
  }

  .editor-btn {
    width: 300px;
    height: 60px;
    padding: 20px;
    margin:20px auto;
    border-radius: 5px;
    font-size: 14px; 
    text-align: center;
    background-color: #ff6600;
    color:rgba(255, 255, 255, .8);
    cursor: pointer;
  }

  .errorTip {
    margin-left: 50px;
    font-size:16px;
    color: red;
  }
   

</style>