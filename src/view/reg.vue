<template>
   <div class="reg-container">
       <form method="post" class="reg-form">
       <div class='reg-form-item'>
            <label>用户名：</label>
            <input type="text" name="userName">
      </div>
       <div class='reg-form-item'>
            <label>密码：</label>
            <input type="password" name="userPwd">
      </div>
      <div class='reg-form-item'>
            <label>请重复输入密码：</label>
            <input type="password" name="userPwd">
      </div>
          <input type="submit" value="确定"> 
       </form>
   </div>
</template>

<<script>
export default {
  
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
     width: 380px;
     height: 220px;
     padding: 20px;
     position: absolute;
     top:50%;
     left: 50%;
     margin: -130px 0  0 -210px;
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
}
 
input[type="submit"] {
  width: 50%;
  height: 40px;
  margin-left: 100px;
  background: #ff6600;
  border-radius: 5px;
  font-size: 16px;
} 
</style>


