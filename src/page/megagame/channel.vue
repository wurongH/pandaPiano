<template>
    <div id="subpage">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>题库</el-breadcrumb-item>
                <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div class="xcx-search">
                    <el-input placeholder="请输入关键字" v-model="name" class="search_inp">
                    </el-input>
                    <el-button type="primary" plain @click="search()">筛选</el-button>
                </div>

                <span class="xcx-add right font14" @click="addChannel()">添加渠道</span>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="title" label="渠道名称"></el-table-column>
                    <el-table-column prop="link" label="小程序链接地址"></el-table-column>
                    <el-table-column prop="total_user_count" label="引流人数"></el-table-column>
                    <el-table-column prop="register_count" label="注册人数">
                        <div slot-scope="scope">
                            <!--<span @click="to_detail(scope.row.id)" class="primary">{{scope.row.register_count}}</span>-->
                            <span>{{scope.row.register_count}}</span>
                        </div>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="100">
                        <div slot-scope="scope">
                            <el-switch v-model="scope.row.status" disabled active-color="#0486fe" inactive-color="#666"></el-switch>
                        </div>
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" width="290">
                        <div slot-scope="scope" class="do_soming">
                            <a v-bind:href="scope.row.src">
                                <el-button type="text" class="primary" size="small" icon="el-icon-download">小程序码</el-button>
                            </a>
                            <el-button type="text" class="primary" size="small" @click="to_statistics(scope.row.id)">日统计</el-button>
                            <el-button type="text" class="primary" size="small" @click="edit(scope.row.id)">修改</el-button>
                            <el-button type="text" class="primary" size="small" @click="deleteBrand(scope.row.id)">删除</el-button>
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
<script src="../../../static/js/megagame/channel.js"></script>

<style scoped>
    @import "../../../static/css/megagame/channel.css";
</style>