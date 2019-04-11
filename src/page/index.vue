<template>
    <div id="index">
        <el-container>
            <!--导航栏-->
            <el-menu default-active="1-4-1" @open="handleOpen" :collapse="isCollapse">
                <el-menu-item index="1" class="logo" disabled>
                    <img src="../../static/img/login/logo.png" />
                    <span slot="title">熊猫钢琴陪练</span>
                </el-menu-item>
                <el-submenu v-for="(item,k) in menuList" :key="item.id" :index="''+ k +''">
                    <template slot="title">
                        <img :src="item.icon" class="icon" />
                        <span slot="title" class="menu-title">{{ item.name }}</span>
                    </template>
                    <el-menu-item-group v-for="(v,val) in item.child" :key="v.id">
                        <span v-if="item.child[val].child">
                            <el-submenu :index="''+ k+'-'+val+''">
                                <span slot="title">{{ v.name }}</span>
                                <el-menu-item v-for="(va,z) in item.child[val].child" :key="z" @click="checkThreeChild(val,k,z)" :index="''+ k +'-' + val +'-' +z+''">{{ va.name }} </el-menu-item>
                            </el-submenu>
                        </span>
                        <span v-else>
                            <el-menu-item @click="checkChild(val,k)" :index="''+ k+'-'+val+''">{{ v.name }}</el-menu-item>
                        </span>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>

            <!--主体-->
            <el-main>
                <!--头部-->
                <el-col class="main_haed">
                    <el-radio-group v-model="isCollapse">
                        <el-radio-button :label="false"><img src="../../static/img/index/open.png" class="open_retract" />
                        </el-radio-button>
                        <el-radio-button :label="true"><img src="../../static/img/index/retract.png" class="open_retract" />
                        </el-radio-button>
                    </el-radio-group>
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            <!--<img src="../../static/img/index/header.png" class="hader"/>-->
                            {{ user_name }}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                            <el-button type="text" @click="edit_password">修改密码</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <!--切换内容-->
                <section class="content-container">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-if="oneMenuName">{{ oneMenuName }}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="twoMenuName">{{ twoMenuName }}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="threeMenuName">{{ threeMenuName }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </section>
            </el-main>
        </el-container>
    </div>
</template>

<script type="text/javascript" src="../../static/js/index.js"></script>

<style>
@import "../../static/css/index.css";
@import "../../static/css/user/member_list.css";
</style>