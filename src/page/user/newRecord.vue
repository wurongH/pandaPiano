<template>
    <div id="subpage">
        <div class="content">
            <div class="xcx-head">
                <span class="title">用户拉新记录</span>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="newavatar_url" label="拉新用户头像">
                        <div slot-scope="scope">
                            <img class="avatar" :src="scope.row.newavatar_url" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="newnickname" label="拉新用户昵称"></el-table-column>
                    <el-table-column prop="avatar_url" label="分享者头像">
                        <div slot-scope="scope">
                            <img class="avatar" :src="scope.row.avatar_url" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="nickname" label="分享者昵称"></el-table-column>
                    <el-table-column prop="create_time" label="注册时间"></el-table-column>
                    <el-table-column prop="type" label="来源方式">
                        <div slot-scope="scope">
                            <span>{{scope.row.type == 1 ? '渠道' : '用户分享'}}</span>
                        </div>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="paging">
                    <el-pagination class="left" @current-change="handleCurrentChange" :current-page="page" background layout="prev, pager, next" :total="count"></el-pagination>
                    <span class="demonstration left">共 {{ count }} 条    每页10条</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/user/newRecord.js"></script>

<style scoped>
    @import '../../../static/css/user/newRecord.css';
</style>