<template>
    <div id="subpage">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>题库</b></el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/megagame/channel'}">渠道管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{(channel_id === 0) ? '添加渠道' : '修改渠道'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <div class="content">
            <div class="xcx-h1">添加渠道页面</div>
            <!--基本信息-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="150px">
                <el-form-item label="渠道名称：" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入渠道名称" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="渠道描述：" prop="desc">
                    <el-input type="textarea" class="w300" rows="3" placeholder="请输入渠道说明" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="小程序地址：">
                    <el-input v-model="ruleForm.link" placeholder="请填写小程序链接地址" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="渠道状态：">
                    <el-radio v-model="ruleForm.radio" label="1">开启</el-radio>
                    <el-radio v-model="ruleForm.radio" label="2">关闭</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="cancel">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script src="../../../static/js/megagame/channel_add.js"></script>

<style scoped>
    @import '../../../static/css/megagame/channel_add.css';
</style>