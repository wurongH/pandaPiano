<template>
    <div id="subpage">
        <div class="content">
            <div class="xcx-head">
                <span class="title">模块管理</span>
                <span class="xcx-add right font14" @click="addRegion()">添加模块</span>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="picture" label="模块图标">
                        <div slot-scope="scope" class="img">
                            <img :src="scope.row.picture" class="avatar" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="name" label="模块名称"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <div slot-scope="scope">
                            <el-switch v-model="scope.row.status" disabled active-color="#0486fe" inactive-color="#666"></el-switch>
                        </div>
                    </el-table-column>
                    <el-table-column prop="operation" label="操作 " width="200">
                        <div slot-scope="scope" class="doSonimg_box font14">
                            <span class="primary" @click="edit(scope.row.course_id)">编辑</span>
                            <span class="danger" @click="deleteRow(scope.row.course_id)">删除</span>
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
<script src="../../../static/js/megagame/region.js"></script>

<style scoped>
@import "../../../static/css/megagame/region.css";
</style>