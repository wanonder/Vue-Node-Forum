  <template>   
        <div>
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">{{errorText}}</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1"  name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" >
              </li>
               <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="text" tabindex="2"  name="emai" v-model="userEmail" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Emai" @keyup.enter="regIn">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="regIn">注  册</a>
          </div>
       </div>  
</template>

<script>
import axios from 'axios'
    export default {
        data () {
            return {
                userName:'',
                userPwd:'',
                userEmail:'',
                errorTip:false,
                errorText:''
            }
        },
        methods: {
           regIn () {
               axios.post('/users/reg',{
                 userName:this.userName,
                 userPwd:this.userPwd,
                 userEmail:this.userEmail
               }).then((result)=>{
                let res = result.data;
                if(res.status === '1' && res.msg === '') {
                    this.errorTip = true;
                    this.errorText = res.result;
                }
                 else {
                    alert("恭喜您，注册成功！")
                    this.$emit('has-reg',res)
                  }
               })
           }
        }
    }
</script>