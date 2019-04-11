<template>
    <div id="subpage">
        <div class="content">
            <div class="xcx-head">
                <div class="xcx-search">
                    <div class="block mr20 mt10">
                        <el-radio v-model="type" label="1">授权用户</el-radio>
                        <el-radio v-model="type" label="2">绑定手机用户</el-radio>
                    </div>
                    <div class="block">
                        <span class="select_date_text">答题时间：</span>
                        <el-date-picker v-model="date" style="margin-right: 30px;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>

                    <el-input placeholder="请输入内容（昵称、手机号）" v-model="name" class="w200 mr20" clearable></el-input>
                    <el-button type="primary" plain @click="search()">筛选</el-button>
                </div>

                <span class="xcx-add right font14" @click="export_flies">导出Excel</span>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="用户头像">
                        <div slot-scope="scope" class="img">
                            <img :src="scope.row.avatar_url" class="avatar" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="nickname" label="用户昵称"></el-table-column>
                    <el-table-column prop="mobile" label="手机号"></el-table-column>
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="total_answer_count" label="答题次数"></el-table-column>
                    <el-table-column prop="accuracy" label="正确率"></el-table-column>
                    <el-table-column prop="create_time" label="注册时间"></el-table-column>
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
<script src="../../../static/js/user/user_gift.js"></script>

<style scoped>
@import "../../../static/css/user/user_gift.css";
</style>