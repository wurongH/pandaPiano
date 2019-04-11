import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import index from '@/page/index'

// 题库
import region from '@/page/megagame/region';
import classify from '@/page/megagame/classify';
import addModules from '@/page/megagame/addModules';
import addTitle from '@/page/megagame/addTitle';
import channel from '@/page/megagame/channel';
import channel_add from '@/page/megagame/channel_add';
import statistics from '@/page/megagame/statistics';

// 用户
import member_list from '@/page/user/member_list';
import user_gift from '@/page/user/user_gift';
import userDetail from '@/page/user/userDetail';
import newRecord from '@/page/user/newRecord';
import edit_pwd from '@/page/user/edit_psd';
import newStatistics from '@/page/user/newStatistics';
import shareRecord from '@/page/user/shareRecord';

// 员工
import user_list from '@/page/set_up/user_list';
import addStaff from '@/page/set_up/addStaff';


Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'index',
            meta:{
                requireAuth: true,
            },
            component: index,
            children: [
                // 题库
                {path: '/megagame/region', component: region},//模块管理
                {path: '/megagame/classify', component: classify},//题库管理
                {path: '/megagame/addModules', component: addModules},//模块管理 添加模块
                {path: '/megagame/addTitle', component: addTitle},//题库管理 添加模块
                {path: '/megagame/channel', component: channel},//渠道管理
                {path: '/megagame/channel_add', component: channel_add},//添加渠道
                {path: '/megagame/statistics', component: statistics},//日统计

                // 用户 
                {path: '/user/member_list', component: member_list},// 用户答题记录
                {path: '/user/user_gift', component: user_gift},// 用户管理
                {path: '/user/userDetail', component: userDetail},// 用户详情
                {path: '/user/newRecord', component: newRecord},// 用户拉新记录
                {path: '/user/edit_pwd', component: edit_pwd},// 修改密码
                {path: '/user/newStatistics', component: newStatistics},// 用户统计
                {path: '/user/shareRecord', component: shareRecord},// 用户分享记录详情

                // 员工
                {path: '/set_up/user_list', component: user_list},// 员工管理
                {path: '/set_up/addStaff', component: addStaff},// 添加员工
            ]
        },
    ],
    scrollBehavior(to, from,savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})
