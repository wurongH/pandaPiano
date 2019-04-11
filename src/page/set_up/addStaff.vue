<template>
    <div id="subpage">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <b>系统设置</b>
                </el-breadcrumb-item>
                <el-breadcrumb-item>员工管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加员工</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">添加员工</span>
            </div>
            <el-form :model="formData" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="150px">
                <el-form-item prop="username" label="账号：">
                    <el-input v-model='formData.username' class="w400" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码：">
                    <el-input type="password" v-model='formData.password' class="w400" clearable></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名：">
                    <el-input v-model='formData.name' class="w400" clearable></el-input>
                </el-form-item>
                <el-form-item prop="phone_num" label="手机号码：">
                    <el-input v-model='formData.phone_num' class="w400" clearable></el-input>
                </el-form-item>
                <el-form-item prop="auth" label="权限：">
                    <div class="radio">
                        <el-radio v-model="formData.auth" label="1">高级管理员</el-radio>
                        <el-radio v-model="formData.auth" label="2">网站管理员</el-radio>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="cancelList()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script src="../../../static/js/set_up/addStaff.js"></script>

<style scoped>
@import "../../../static/css/set_up/addStaff.css";
</style>