<template>
    <div id="subpage">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>题库</el-breadcrumb-item>
            <el-breadcrumb-item>题目列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{subject_id == 0 ? '添加题目' : '修改题目'}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{subject_id == 0 ? '添加题目' : '修改题目'}}</span>
            </div>

            <!-- 主体内容 -->
            <div class="xcx-content">
                <el-form style="padding-top: 0;" class="add_title_form" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
                    <el-form-item label="题目模块：" prop="course_id">
                        <el-select v-model="ruleForm.course_id" class="w400" placeholder="请选择">
                            <el-option v-for="item in select_data" :key="item.course_id" :label="item.name" :value="item.course_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="名称：" prop="title">
                        <el-input class="w400" v-model="ruleForm.title" placeholder="请输入题目名称"></el-input>
                    </el-form-item>

                    <el-form-item class="el-form-item_2" label="题目配图：">
                        <el-upload accept="image/png, image/jpg" action="http://up-z2.qiniup.com" class="addTitleimg" :file-list="imgList" :limit="1" list-type="picture-card" :on-preview="descPictureCardPreview" :on-remove="descRemove" :on-success="descAvatarSuccess" :on-error="descError" :on-exceed="descExceed" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div class="el-upload__tip" slot="tip">图片大小690X390像素，图片格式png、jpg</div>
                        </el-upload>
                        <!--<p class="disc">图片尺寸750 X 900</p>-->
                        <el-dialog :visible.sync="desc_img">
                            <img width="100%" :src="descImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>

                    <el-form-item label="题目音频：" prop="audio">
                        <el-upload accept="audio/*" style="width: 400px;" class="upload-demo" action="http://up-z2.qiniup.com" :on-preview="preview_video" :on-remove="remove_audio" :before-upload='beforeUpload' :before-remove="before_remove_video" :on-success="upload_video_success" :limit="1" :show-file-list="false" :on-exceed="handle_exceed_video" :data="postData" v-if="is_upload_video === false">
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
                                    <el-slider @change="changeTime" :format-tooltip="formatTime" :max="music.maxTime" v-model="music.currentTime" style="width: ©©©©%;"></el-slider>
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

                    <el-form-item label="选项设置：" prop="author">
                        <div slot-scope="scope" id="select_box">
                            <div class="select_row" v-for="(item, index) in ruleForm.problem.problem_item" :key="index">
                                <div class="mr20">{{letter[index]}}.</div>
                                <el-input class="mr20 w400" placeholder="请输入内容" v-model="ruleForm.problem.problem_item[index].answer" :value="item.answer"></el-input>
                                <el-radio class="mr20 dis_flex"  v-model="ruleForm.problem.true_index" :label="index">正确选项</el-radio>
                                <div class="danger cursor" v-show="index > 1" @click="del_problem(index)">删除</div>
                            </div>

                            <div class="add_select">
                                <el-button type="primary" @click="add_problem" plain>添加</el-button>
                            </div>
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

<script src='../../../static/js/megagame/addTitle.js'></script>

<style scoped>
@import "../../../static/css/megagame/addTitle.css";
</style>

