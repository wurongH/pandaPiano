export default {
  data() {
    return {
      course_id: 0,
      ruleForm: {
        name: '',
        audio: '',
        content: '',
        author: '',
        status: '1',
        sort: '',
      },
      rules: {
        name: [{
          required: true,
          message: '请输入音频名称',
          trigger: 'blur'
        }, ],
        sort: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }, ],
        status: [{
          required: true,
          message: '请选择选择',
          trigger: 'blur'
        }, ],
      },
      imgList: [], //图片列表
      postData: {}, //七牛云postData

      descImageUrl: '', //图片
      desc_img: false, //是否展示删除
      domain: '', //图片域名,
      stageList: [], //期数列表
      date: [],


      imgList1: [], //题目默认图片
      descImageUrl1: '',
      desc_img1: false,

      src: '',
      is_upload_video: false,
      preview_video_dialog: false,
      fullscreenLoading: false,

      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 100
      }
    };
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    const that = this;
    //在缓存中获取值
    that.user_name = sessionStorage.getItem("user_name");
    that.user_id = sessionStorage.getItem("user_id");
    that.token = sessionStorage.getItem("access-token");
    if ((!that.token) || (!that.user_id) || (!that.user_name)) {
      that.$router.push('/login');
    }
    if (that.$route.query.course_id) {
      that.course_id = that.$route.query.course_id;
      that.detail();
    }
    that.getQiNiuToken();
    //初始化播放器
    that.$nextTick(() => {
      setInterval(that.listenMusic, 1000)
    })
  },

  /**
   *方法
   */
  methods: {

    /**
     * 获取七牛云token
     */
    getQiNiuToken: function () {
      const that = this;
      //请求登陆接口
      that.$http.post(that.adminApi.api_url + "/Qiniu/getToken", {
        token: that.token,
      }, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          that.postData = {
            token: res.body.upToken,
          }
          that.domain = res.body.domain;
        });
    },

    /**
     * 格式化时间
     * @param time
     * @returns {string}
     */
    formatTime(time) {
      let it = parseInt(time);
      let m = parseInt(it / 60);
      let s = parseInt(it % 60);
      return (m < 10 ? "0" : "") + parseInt(it / 60) + ":" + (s < 10 ? "0" : "") + parseInt(it % 60)
    },

    //上传图片
    /**
     * 删除
     * @param file
     * @param fileList
     */
    descRemove(file, fileList) {
      var that = this;
      that.imgList = fileList;
    },

    descPictureCardPreview(file) {
      this.descImageUrl = file.url;
      this.desc_img = true;
    },
    /**
     * 显示错误
     * @param res
     */
    descError(res) {
      console.log(res)
    },

    /**
     * 上传成功后在图片框显示图片
     * @param res
     * @param file
     */
    descAvatarSuccess(res, file) {
      const that = this;
      const imageUrl = {
        url: that.domain + res.key,
        uid: file['raw']['uid']
      };
      that.imgList.push(imageUrl);
    },

    /**
     * 文件超出个数限制时的钩子
     * @param files
     * @param fileList
     */
    descExceed(files, fileList) {
      this.$message.error('只能上传一张图片');
    },

    //上传图片1111
    /**
     * 删除
     * @param file
     * @param fileList
     */
    descRemove1(file, fileList) {
      var that = this;
      that.imgList1 = fileList;
    },

    descPictureCardPreview1(file) {
      this.descImageUrl1 = file.url;
      this.desc_img1 = true;
    },
    /**
     * 显示错误
     * @param res
     */
    descError1(res) {
      console.log(res)
    },

    /**
     * 上传成功后在图片框显示图片
     * @param res
     * @param file
     */
    descAvatarSuccess1(res, file) {
      const that = this;
      const imageUrl1 = {
        url: that.domain + res.key,
        uid: file['raw']['uid']
      };
      that.imgList1.push(imageUrl1);
    },

    /**
     * 文件超出个数限制时的钩子
     * @param files
     * @param fileList
     */
    descExceed1(files, fileList) {
      this.$message.error('只能上传一张图片');
    },

    /**
     * 预览视频
     */
    preview_video: function (e) {
      let that = this;
      that.preview_video_dialog = true;
    },

    /**
     * 上传视频-成功
     * @param e
     */
    upload_video_success: function (e) {
      let that = this;
      that.ruleForm.audio = that.domain + e.key;
      that.is_upload_video = true;
      that.fullscreenLoading = false;
    },

    /**
     * 移除
     */
    remove_audio: function (e) {
      let that = this;
      that.ruleForm.audio = '';
      that.is_upload_video = false;
    },


    /**
     * 移除前的操作
     */
    before_remove_video: function (e) {
      let that = this;

    },

    /**
     *上传前的操作
     */
    beforeUpload: function (file) {
      let that = this;
      that.fullscreenLoading = true;
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error('上传的音频过大,请压缩后上传,视频大小不能超过20M!');
        that.fullscreenLoading = false;
      }
      return isLt20M;
    },

    handle_exceed_video: function (e) {
      let that = this;
      console.log('预览视频4', e);
    },


    /**
     * 返回
     */
    cancel: function () {
      var that = this;
      that.$router.back(-1);
    },

    /**
     * 播放器
     */
    listenMusic() {
      if (!this.$refs.music) {
        return
      }
      if (this.$refs.music.readyState) {
        this.music.maxTime = this.$refs.music.duration
      }
      this.music.isPlay = !this.$refs.music.paused
      this.music.currentTime = this.$refs.music.currentTime
    },

    /**
     * 播放/暂停音乐
     */
    play() {
      if (this.$refs.music.paused) {
        this.$refs.music.play()
      } else {
        this.$refs.music.pause()
      }
      this.music.isPlay = !this.$refs.music.paused
      this.$nextTick(() => {
        document.getElementById('play').blur()
      })
    },

    /**
     * 改变播放时间
     * @param time
     */
    changeTime(time) {
      this.$refs.music.currentTime = time
    },

    /**
     * 调整音量
     * @param v
     */
    changeVolume(v) {
      this.music.volume += v
      if (this.music.volume > 100) {
        this.music.volume = 100
      }
      if (this.music.volume < 0) {
        this.music.volume = 0
      }
      this.$refs.music.volume = this.music.volume / 100
    },


    /**
     * 保存
     */
    onSubmit: function (formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.course_id === 0) {
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
    add: function () {
      const that = this;

      if (that.imgList.length === 0 || that.imgList1.length === 0) {
        that.$message({
          type: 'error',
          message: `操作提示: ${ '请上传图片' }`
        });
        return false;
      }

      //请求的数据
      var formData = {};
      formData.token = that.token;
      formData.name = that.ruleForm.name;
      formData.picture = that.imgList[0].url;
      formData.default_picture = that.imgList1[0].url;
      formData.audit = that.ruleForm.audio;
      formData.sort = that.ruleForm.sort;
      formData.status = that.ruleForm.status;

      //请求api
      that.$http.post(that.adminApi.api_url + "/Modular/modular_add", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          that.$message({
            type: 'success',
            message: `操作提示: ${ '添加成功' }`
          });
          that.$router.back(-1);
        });
    },


    /**
     * 显示详情
     */
    detail: function () {
      const that = this;
      //请求的数据
      const formData = {};
      formData.token = that.token;
      formData.course_id = that.course_id;

      //请求api
      that.$http.post(that.adminApi.api_url + "/Modular/modular_edit_show", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          var data = res.body;
          if (data) {
            that.ruleForm.name = data.name;
            that.imgList.push({
              url: data.picture
            })

            if (data.default_picture) {
              that.imgList1.push({
                url: data.default_picture
              })
            }

            if (data.audit) {
              that.ruleForm.audio = data.audit;
              that.is_upload_video = true;
            }
            that.ruleForm.sort = data.sort;
            that.ruleForm.status = data.status.toString();
          }

        });
    },

    /**
     * 添加
     */
    edit: function () {
      const that = this;
      if (that.imgList.length === 0 || that.imgList1.length === 0) {
        that.$message({
          type: 'error',
          message: `操作提示: ${ '请上传图片' }`
        });
        return false;
      }

      //请求的数据
      var formData = {};
      formData.token = that.token;
      formData.name = that.ruleForm.name;
      formData.picture = that.imgList[0].url;
      formData.default_picture = that.imgList1[0].url;
      formData.audit = that.ruleForm.audio;
      formData.sort = that.ruleForm.sort;
      formData.status = that.ruleForm.status;
      formData.course_id = that.course_id;


      //请求api
      that.$http.post(that.adminApi.api_url + "/Modular/modular_edit", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          that.$message({
            type: 'success',
            message: `操作提示: ${ '修改成功' }`
          });
          that.$router.back(-1);
        });
    },

  }
}
