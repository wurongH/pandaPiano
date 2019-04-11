<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <div class="logo">
          <img src="../../static/img/login/logo_login.png" alt="">
          <p class="title">熊猫钢琴陪练</p>
        </div>
      </el-form-item>
      <el-form-item prop="user_name">
        <img src="../../static/img/login/user.png" class="icon-user" />
        <el-input v-model="form.user_name" placeholder="账户" @input="checkNumber(user_name)"  clearable></el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <img src="../../static/img/login/password.png" class="icon-password" />
        <el-input v-model="form.passWord" placeholder="密码" type="password" @keydown.native.enter="Login" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>
<script src="../../static/js/Login.js"></script>
<style scoped>
	@import '../../static/css/login.css';
</style>
