<template>   
        <div>
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="loginIn">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="loginIn">登  录</a>
          </div>
       </div>  
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
           userName:'',
           userPwd: '',
           errorTip:false
        }
    },
    methods:{
      loginIn () {
          if(!this.userName || !this.userPwd){
              this.errorTip = true;
               return;
          }
           axios.post("/users/login",{
           userName:this.userName,
           userPwd:this.userPwd
         }).then((result)=>{
           let res = result.data;
           if(res.status=="0") {
            this.errorTip = false;
            this.$emit('has-log',res)
          } else {
            this.errorTip = true;
        }
      })
    }     
  }
}
</script>