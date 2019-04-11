<template>
    <div id="subpage">
        <div class="content">
            <div class="xcx-head">
                <div class="title">
                    <span>用户统计列表</span>
                    <el-date-picker v-model="date" class="ml50" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" plain @click="search()">筛选</el-button>
                </div>
            </div>
            <div class="xcx-content">

                <el-row class="mb30 font14">
                    <el-col :span='3'>分享总数: <span class="ml20">{{statistics.share}}</span> </el-col>
                    <el-col :span='4'>拉新总数: <span class="ml20">{{statistics.pull_new}}</span> </el-col>
                </el-row>

                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="用户头像">
                        <div slot-scope="scope" class="img">
                            <img :src="scope.row.avatar_url" class="avatar" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="nickname" label="用户昵称"></el-table-column>
                    <el-table-column prop="share" label="分享总次数"></el-table-column>
                    <el-table-column prop="pull_new" label="拉新总次数"></el-table-column>
                    <el-table-column prop="operation" label="操作" width="200">
                        <div slot-scope="scope" class="doSonimg_box font14">
                            <span class="primary" @click="see_detail(scope.row.user_id)">查看详情</span>
                        </div>
                    </el-table-column>
                </el-table>

                <!--分页-->
                <div class="paging">
                    <el-pagination class="left" @current-change="handleCurrentChange" :current-page="page" background layout="prev, pager, next" :total="count"></el-pagination>
                    <span class="demonstration left">共 {{ count }} 条 每页10条</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/user/newStatistics.js"></script>

<style scoped>
@import "../../../static/css/user/newStatistics.css";
</style>