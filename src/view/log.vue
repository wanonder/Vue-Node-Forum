<template>
  <div class="log-container">
      <form class="log-form">
         <div class='log-form-item'>
            <label>账号：</label>
            <input type="text" v-model="userName">     
          </div>
          <div class='log-form-item'>
            <label>密码：</label>
            <input type="password" v-model="userPwd">
          </div>
          <input type='submit' value="登       录" @click="loginSub">
          <p>{{ errorText }}</p>
       </form>
       
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
      return {
          userName:'',
          userPwd:'',
          errorText:''
      }
    },
     
    methods: {
      loginSub (){
         if (!this.userName || !this.userPwd) {
        this.errorText = '密码或用户名不能为空'
      } else {
        axios.post('/users/login',{userName:this.userName,userPwd:this.userPwd}).then((result)=>{
            let res = result.data;
           if(res.status === '0') {
            router.push({path:'/'})
            
           }
        })
       }
      }
    }
}
</script>

<style scoped>
.log-container {
  width: 800px;
  height: 500px;
  padding: 20px;
   border: 1px solid #345346;
   position: relative;
   font-size: 12px;
   z-index: 22;
}

 .log-form {
     width: 500px;
     height: 220px;
     padding: 20px;
     position: absolute;
     top:50%;
     left: 50%;
     margin: -130px 0  0 -220px;
   }

.log-form-item {
    width: 100%;
    margin-bottom: 20px;
}

.log-form-item label {
  width: 30%;
  text-align: right;
}
.log-form-item input {
  width: 50%;
  height: 30px;
  text-align: center;
}

input[type="submit"] {
  width: 50%;
  height: 40px;
  margin-left: 40px;
  background: #ff6600;
  border-radius: 5px;
  font-size: 16px;
} 
</style>

