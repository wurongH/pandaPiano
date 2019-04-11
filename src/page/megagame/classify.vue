<template>
    <div id="subpage">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>题库</el-breadcrumb-item>
                <el-breadcrumb-item>题目列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div class="xcx-search">
                    <el-input placeholder="请输入关键字" v-model="key_words" class="search_inp">

                        <el-select slot="append" style="width: 110px;" v-model="course_id" placeholder="请选择">
                            <el-option v-for="item in select_data" :key="item.course_id" :label="item.name" :value="item.course_id"></el-option>
                        </el-select>

                    </el-input>
                    <el-button type="primary" plain @click="search()">筛选</el-button>
                </div>

                <span class="xcx-add right font14" @click="addRegion()">添加题目</span>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="course_name" label="模块名称"></el-table-column>
                    <el-table-column prop="picture" label="题目图片">
                        <div slot-scope="scope">
                            <img class="classify_img" v-if='scope.row.picture' :src="scope.row.picture" alt="">

                            <span v-else>暂无</span>
                        </div>
                    </el-table-column>
                    <el-table-column prop="title" label="题目名称"></el-table-column>
                    <el-table-column prop="count" label="被答次数 "></el-table-column>
                    <el-table-column prop="accuracy" label="正确率"></el-table-column>
                    <el-table-column prop="operation" label="操作 " width="200">
                        <div slot-scope="scope" class="doSonimg_box font14">
                            <span class="primary" @click="edit(scope.row.id)">编辑</span>
                            <span class="danger" @click="deleteRow(scope.row.course_id, scope.row.id)">删除</span>
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
<script src="../../../static/js/megagame/classify.js"></script>

<style scoped>
@import "../../../static/css/megagame/classify.css";
</style>