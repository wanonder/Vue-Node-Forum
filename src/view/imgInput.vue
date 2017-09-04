<template>
<div class="img-view">
    <input @change="handleFileChange" ref="inputer" type="file" id="input">
    <label for="input"></label>
    <img :src="pic">
    <div class="img-mask" v-if="imgSelected && !noMask">
      <p class="img-fileName">{{file_name}}</p>
      <p class="img-change" >点击图片以修改</p>
    </div>
</div>    
</template>

<script>
import axios from 'axios';
export default {
   data () {
     return {
         file_name:'',
         noMask:false
       }
     }
        ,
   props:{
     value: {default: undefined},
     pic:{type:String}
  }
   ,
  computed: {
      imgSelected () {
        return !!this.pic || !!this.file_name;
   }
},
     methods: {      
        handleFileChange (e) {
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.file = inputDOM.files[0];

            let size = Math.floor(this.file.size / 1024);
            if (size > 3*1024) {
                // 这里可以加个文件大小控制
                return false
            }
        
            // 触发这个组件对象的input事件
            this.$emit('input', this.file);
            
            // 这里就可以获取到文件的名字了
            this.fileName = this.file.name;
            this.file_name = this.fileName;
            
            var formData = new FormData();

             formData.append("upfile", this.file);

         
            this.$emit('imgView',this.file);

           if(/^image/.test(this.file.type)) {
                 axios.post('/users/upload',formData).then((result)=>{
                    let res = result.data;

                 })
            }
           
        },
      }
    }


</script>

<style scoped>
.img-view {
    position: relative;
    margin-left: 25px;
    float:left;
}

.img-view:hover {
    transform: scale(1.025);
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
}

.img-view:hover >.img-mask {
    display:block;
}
input {
    position: absolute;
    left: -9999px;
}    
/* 使label充满整个box*/
label {
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 10; 
}  
.img-view img{
    border-radius: 8px;
    width:120px;
    height:120px;
} 

.img-mask {
    display: none;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    text-align: center;
    background: rgba(0, 0, 0, .22);
} 

.img-fileName {
    color: white;
    font-size: 13px;
    padding-top: 10px;
    margin: 0;
    display: inline-block;
    max-width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
   overflow: hidden;
}

.img-change {
     position: absolute;
    bottom: 0;
    margin: 0;
    font-size: 12px;
    border-radius: 0 0 5px 5px;
    background: rgba(0, 0, 0, .7);
    text-align: center;
    color: white;
    width: 100%;
   padding: 9px 0;
}
</style>