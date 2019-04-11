<template>
    <div id="subpage">
        <div class="content">
            <div class="xcx-head">
                <div class="xcx-search">
                    <el-input placeholder="请输入关键字" v-model="key_words" class="w400 search_inp">
                        <el-select v-model="course_id" slot="append" class="inp_select" placeholder="请选择">
                            <el-option v-for="item in select_data" :key="item.course_id" :label="item.name" :value="item.course_id"></el-option>
                        </el-select>
                    </el-input>

                    <el-input class="w300 mr20" v-model="nick_name" placeholder="请输入内容（昵称、手机号）"></el-input>

                    <el-button type="primary" plain @click="search()">筛选</el-button>
                </div>

                <span class="xcx-add right font14" @click="export_files">导出Excel</span>
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
                    <el-table-column prop="subject_name" label="题目名称"></el-table-column>
                    <el-table-column prop="course_name" label="所属模块"></el-table-column>
                    <el-table-column prop="sort" label="是否正确">
                        <div slot-scope="scope">
                            <span>{{scope.row.is_true == 1 ? '正确' : '错误'}}</span>
                        </div>
                    </el-table-column>
                    <el-table-column prop="create_time" label="回答时间"></el-table-column>
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
<script src="../../../static/js/user/member_list.js"></script>

<style scoped>
@import "../../../static/css/user/member_list.css";
</style>