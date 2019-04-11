<template>
    <div id="subpage">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>用户</el-breadcrumb-item>
                <el-breadcrumb-item>用户统计</el-breadcrumb-item>
                <el-breadcrumb-item>用户分享详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">用户详细分享记录表</span>
            </div>
            <div class="xcx-content">

                <el-form :model="formData" label-width="120px">
                    <el-form-item label="用户昵称：" prop="name">{{formData.nickname}}</el-form-item>
                    <el-form-item label="用户头像：" prop="avatar">
                        <img :src="formData.avatar_url" class="avatar1" alt="">
                    </el-form-item>
                    <el-form-item label="分享总数：" prop="share_total">{{formData.share}}</el-form-item>
                    <el-form-item label="拉新总数：" prop="pull_total">{{formData.pullnew}}</el-form-item>
                </el-form>

                <el-row style="margin-left: 20px;" :gutter="90">
                    <el-col :span="7">
                        <el-table border :data="shareData" stripe>
                            <el-table-column prop="type" label="分享页面"></el-table-column>
                            <el-table-column prop="share_time" label="分享时间"></el-table-column>
                        </el-table>
                    </el-col>

                    <el-col class="" :span="13">
                        <el-table border :data="pullData" stripe>
                            <el-table-column prop="avatar_url" label="用户头像">
                                <div slot-scope="scope">
                                    <img :src="scope.row.avatar_url" class="avatar" alt="">
                                </div>
                            </el-table-column>
                            <el-table-column prop="nickname" label="用户昵称"></el-table-column>
                            <el-table-column prop="create_time" label="进入时间"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/user/shareRecord.js"></script>

<style scoped>
</style>