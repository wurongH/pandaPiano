<template>
    <div id="subpage">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>题库</el-breadcrumb-item>
            <el-breadcrumb-item>模块管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{course_id == 0 ? '添加模块' : '修改模块'}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{course_id == 0 ? '添加模块' : '修改模块'}}</span>
            </div>

            <!-- 主体内容 -->
            <div class="xcx-content">
                <el-form class="add_radio_form" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px">
                    <el-form-item label="名称：" prop="name">
                        <el-input class="w400" v-model="ruleForm.name" placeholder="请输入轮播图的名称"></el-input>
                    </el-form-item>

                    <el-form-item class="el-form-item_2" label="图标：">
                        <el-upload accept="image/*" action="http://upload-z2.qiniup.com" :file-list="imgList" list-type="picture-card" :limit="1" :on-preview="descPictureCardPreview" :on-remove="descRemove" :on-success="descAvatarSuccess" :on-error="descError" :on-exceed="descExceed" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div class="el-upload__tip" slot="tip">图片大小140X140像素，图片格式png、jpg</div>
                        </el-upload>
                        <el-dialog :visible.sync="desc_img">
                            <img width="100%" :src="descImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>

                    <el-form-item class="el-form-item_2" label="题目默认图片：">
                        <el-upload accept="image/*" action="http://upload-z2.qiniup.com" :file-list="imgList1" list-type="picture-card" :limit="1" :on-preview="descPictureCardPreview1" :on-remove="descRemove1" :on-success="descAvatarSuccess1" :on-error="descError1" :on-exceed="descExceed1" :data="postData">
                            <i class="el-icon-plus"></i>
                            <!-- <div class="el-upload__tip" slot="tip">图片大小140X140像素，图片格式png、jpg</div> -->
                        </el-upload>
                        <el-dialog :visible.sync="desc_img">
                            <img width="100%" :src="descImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>

                    <el-form-item label="背景音乐：" prop="audio">
                        <el-upload accept="audio/*" style="width: 400px;" class="addModlues_img" action="http://upload-z2.qiniup.com" :on-preview="preview_video" :on-remove="remove_audio" :before-upload='beforeUpload' :before-remove="before_remove_video" :on-success="upload_video_success" :limit="1" :show-file-list="false" :on-exceed="handle_exceed_video" :data="postData" v-if="is_upload_video === false">
                            <el-button size="small" type="primary" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="上传中,请稍候">上传音频
                            </el-button>
                            <div class="el-upload__tip" slot="tip">音频格式mp3</div>
                        </el-upload>
                        <el-button size="small" type="primary" @click="remove_audio" v-if="is_upload_video">移除音频
                        </el-button>
                        <div style="padding-top: 10px;" v-if="is_upload_video">
                            <el-row>
                                <el-col :span="0.5">
                                    <el-popover placement="top-start" trigger="hover">
                                        <div style="text-align: center">
                                            <el-progress color="#67C23A" type="circle" :percentage="music.volume"></el-progress>
                                            <br>
                                            <el-button @click="changeVolume(-10)" icon="el-icon-minus" circle></el-button>
                                            <el-button @click="changeVolume(10)" icon="el-icon-plus" circle></el-button>
                                        </div>
                                        <el-button @click="play" id="play" slot="reference" :icon="music.isPlay?'iconfont icon-iconstop':'el-icon-caret-right'" circle></el-button>
                                    </el-popover>
                                </el-col>
                                <el-col :span="2" style="padding-left: 15px;">
                                    <el-slider @change="changeTime" :format-tooltip="formatTime" :max="music.maxTime" v-model="music.currentTime" style="width: 100%;"></el-slider>
                                </el-col>
                                <el-col :span="6" style="padding: 0px 0px 0px 10px;color:#909399;font-size: 13px">
                                    {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
                                </el-col>
                            </el-row>
                            <audio ref="music" loop autoplay>
                                <source :src="ruleForm.audio" type="audio/mpeg">
                            </audio>
                        </div>
                    </el-form-item>

                    <el-form-item label="排序：" prop="sort">
                        <el-input class="w300" placeholder="请输入排序" v-model="ruleForm.sort"></el-input>
                    </el-form-item>

                    <el-form-item label="状态：" prop="status">
                        <div slot-scope="scope">
                            <el-radio v-model="ruleForm.status" label="1">开启</el-radio>
                            <el-radio v-model="ruleForm.status" label="2">关闭</el-radio>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                        <el-button @click="cancel()">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script src='../../../static/js/megagame/addModules.js'></script>

<style scoped>
@import "../../../static/css/megagame/addModules.css";
</style>

