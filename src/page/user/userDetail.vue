<template>
    <div id="subpage">
        <div class="content">
            <div class="xcx-head">
                <span class="title">用户详情</span>
            </div>
            
            <div class="xcx-content">
                <div id='userDetail_box'>
                    <div class="item">
                        <div class="k">用户头像：</div>
                        <img :src="formData.avatar_url" class="avatar" alt="">
                    </div>

                    <div class="item">
                        <div class="k">用户昵称：</div>
                        <span class="font14 black">{{formData.nickname}}</span>
                    </div>

                    <div class="item">
                        <div class="k">用户性别：</div>
                        <span class="font14 black">{{formData.gender}}</span>
                    </div>

                    <div class="item">
                        <div class="k">手机号码：</div>
                        <span class="font14 black">{{formData.mobile}}</span>
                    </div>

                    <div class="item">
                        <div class="k">注册时间：</div>
                        <span class="font14 black">{{formData.create_time}}</span>
                    </div>

                    <div class="item">
                        <div class="k">答题总数：</div>
                        <span class="font14 black">{{formData.total_answer_count}}</span>
                    </div>

                    <div class="item">
                        <div class="k">正确率：</div>
                        <span class="font14 black">{{formData.accuracy}}</span>
                    </div>

                    <div class="item">
                        <div class="k">所在城市：</div>
                        <span class="font14 black">{{formData.area}}</span>
                    </div>

                    <el-button @click="go_back">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/user/userDetail.js"></script>

<style scoped>
@import "../../../static/css/user/userDetail.css";
</style>