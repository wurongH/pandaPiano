export default {
    data() {
        return {
            channel_id:0,
            ruleForm: {
                name: '',
                desc:'',
                integral:'',
                stock:'',
                postData: {},
                radio:"1",
                type:"1",
                sort:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入渠道名称', trigger: 'blur' },
                ],
                desc: [
                    { required: true, message: '请输入渠道描述', trigger: 'blur' },
                ],
            },
            region_name_list:[],
            region_id:''
        }
    },

    //进入页面加载
    mounted: function() {
        var that = this;
        //在缓存中获取值
        that.user_name = sessionStorage.getItem("user_name");
        that.user_id = sessionStorage.getItem("user_id");
        that.token = sessionStorage.getItem("access-token");
        if((!that.token) || (!that.user_id) || (!that.user_name)) {
            that.$router.push('/login');
        }
        //加载轮播详情
        if(that.$route.query.channel_id) {
            that.channel_id = that.$route.query.channel_id;
            that.detail();
        }
    },

    //方法
    methods: {
        //请求api
        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    if(that.channel_id === 0) {
                        that.add();
                    } else {
                        that.edit();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        /**
         * 添加
         */
        add:function () {
            var that = this;
            if(that.ruleForm.type === 1){
                if(!that.ruleForm.link){
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ '请填写小程序地址' }`
                    });
                    return false;
                }
            }

            //请求的数据
            var formData = {};
            formData.token = that.token;
            formData.user_id = that.user_id;
            formData.title = that.ruleForm.name;
            formData.describe = that.ruleForm.desc;
            formData.channel_url = that.ruleForm.link;
            formData.type = that.ruleForm.type;
            formData.status = that.ruleForm.radio;

            //请求api
            that.$http.post(that.adminApi.api_url + "/Channel/add", formData, {
                emulateJSON: true
            }).then(
                function(res) {
                    // 处理成功的结果
                    that.$message({
                        type: 'success',
                        message: `操作提示: ${ '添加成功' }`
                    });
                    that.$router.push({path:'/megagame/channel'});
                },
                function() {
                    // 处理失败的结果
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ '处理异常' }`
                    });
                });
        },

        /**
         * 详情
         */
        detail:function () {
            var that = this;
            //请求的数据
            var formData = {};
            formData.token = that.token;
            formData.id = that.channel_id;

            //请求邀请者列表
            that.$http.post(that.adminApi.api_url + "/Channel/show_edit", formData, {
                emulateJSON: true
            }).then(
                function(res) {
                    that.ruleForm.type=res.body.type.toString();
                    that.ruleForm.name=res.body.title;
                    that.ruleForm.desc=res.body.describe;
                    that.ruleForm.link=res.body.channel_url;
                    that.ruleForm.radio=res.body.status.toString();
                },
                function() {
                    // 处理失败的结果
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ '处理异常' }`
                    });
                });
        },

        /**
         * 修改
         * @returns {boolean}
         */
        edit:function () {
            var that = this;
            if(that.ruleForm.type === 1){
                if(!that.ruleForm.link){
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ '请填写小程序地址' }`
                    });
                    return false;
                }
            }

            //请求的数据
            var formData = {};
            formData.token = that.token;
            formData.user_id = that.user_id;
            formData.title = that.ruleForm.name;
            formData.describe = that.ruleForm.desc;
            formData.channel_url = that.ruleForm.link;
            formData.type = that.ruleForm.type;
            formData.status = that.ruleForm.radio;
            formData.id = that.channel_id;

            //请求api
            that.$http.post(that.adminApi.api_url + "/Channel/edit", formData, {
                emulateJSON: true
            }).then(
                function(res) {
                    // 处理成功的结果
                    that.$message({
                        type: 'success',
                        message: `操作提示: ${ '修改成功' }`
                    });
                    that.$router.push({path:'/megagame/channel',query: {type: that.ruleForm.type}});
                },
                function() {
                    // 处理失败的结果
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ '处理异常' }`
                    });
                });
        },

        /**
         * 返回
         */
        cancel:function () {
            let that = this;
            that.$router.back(-1);
        },
    }
}