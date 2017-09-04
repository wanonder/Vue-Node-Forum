<template>
   <div class="reg-container">
      <form  class="reg-form">
       <div class='reg-form-item'>
            <label>用户名：</label>
            <input type="text" v-model="userName" name="userName" placeholder="用户名长度应大于5">
            <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
       <div class='reg-form-item'>
            <label>密码：</label>
            <input type="password" v-model="userPwd" name="userPwd" placeholder="用户密码长度应在1-6之间">
            <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class='reg-form-item'>
            <label>请重复输入密码：</label>
            <input type="password" v-model="userPwd1" name="userPwd1">
             <span class="g-form-error">{{ passwordErrors1.errorText }}</span>
      </div>
          <input type="button" value="确  定" @click="regSub"> 
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
      userPwd1:'',
      errorText:''
    }
  },
   computed: {
    userErrors () {
      this.errorText='';
      let errorText, status;
      if (this.userName.length<5) {
        status = false
        errorText = '用户名长度应大于5'
      }
      else {
        status = true;
        errorText = '';
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      this.errorText='';
      let errorText, status
      if (this.userPwd.length>6 || this.userPwd.length<1 ) {
        status = false
        errorText = '密码不是1-6位'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    },
   passwordErrors1 () {
      this.errorText='';
      let errorText, status
      if(this.userPwd1 ==''){ this.userPwd1 ='' }
      else {
      if (this.userPwd !== this.userPwd1) {
        status = false
        errorText = '两次密码输入不相同'
      }
      else {
        status = true
        errorText = ''
      }
      }
      if (!this.passwordFlag1) {
        errorText = ''
        this.passwordFlag1 = true
      }
      return {
        status,
        errorText
      }
      
    }

  } ,
  methods:{
   regSub (){
         if (!this.userName || !this.userPwd) {
        this.errorText = '有部分项未通过，请重新填写'
      } else {
        axios.post('/users/reg',{userName:this.userName,userPwd:this.userPwd}).then((result)=>{
            let res = result.data;
            console.log(res.result);
        })
       }
      }
  }
}
</script>

<style>
.reg-container {
  width: 800px;
  height: 500px;
  padding: 20px;
   border: 1px solid #345346;
   position: relative;
   font-size: 12px;
}

 .reg-form {
   width: 500px;
   height: 220px;
   padding: 20px;
   position: absolute;
   top:50%;
   left:50%;
   margin: -130px 0 0 -270px;

   }

.reg-form-item {
    width: 100%;
    margin-bottom: 20px;
}

.reg-form-item label {
  display: inline-block;
  width: 100px;
  text-align: right;
}

.reg-form-item input {
  width: 50%;
  height: 30px;
  text-align: center;
}

.g-form-error {
   color:red;
   font-size: 10px;
 }

input[type="button"] {
  width: 52%;
  height: 40px;
  margin-left: 100px;
  background: #ff6600;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
} 
 

</style>


