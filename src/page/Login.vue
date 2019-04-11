<template>
	<div id="login">
		<img src="../../static/img/login/logo_login.png" class="logo" />
		<p class="title">熊猫钢琴陪练</p>
		<div id="form">
			<div class="model">
				<img src="../../static/img/login/user.png" class="icon-user" />
				<el-input v-model="user_name" @input="setAccount(user_name)" placeholder="账号" prefix-icon=" " clearable></el-input>
			</div>
			<div class="model">
				<img src="../../static/img/login/password.png" class="icon-password" />
				<el-input v-model="passWord" @input="setPwd(passWord)" @keyup.enter.native="Login" type="password" placeholder="请输入密码" prefix-icon=" " clearable></el-input>
			</div>
			<el-button @click="Login" type="primary">登录</el-button>
		</div>
	</div>
</template>

<script src="../../static/js/Login.js"></script>

<style scoped>
	@import '../../static/css/login.css';
</style>