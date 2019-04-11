export default {
  data() {
    return {
      formData: {
        avatar_url: '',
        nickname: '',
        gender: '',
        mobile: '',
        create_time: '',
        total_answer_count: '',
        accuracy: '', //正确率
        area: '',
        total_answer_count: '',
      },
      user_detail_id: '',
    }
  },
  //进入页面加载
  mounted: function () {
    var that = this;
    //在缓存中获取值
    that.user_name = sessionStorage.getItem("user_name");
    that.user_id = sessionStorage.getItem("user_id");
    that.token = sessionStorage.getItem("access-token");
    if ((!that.token) || (!that.user_id) || (!that.user_name)) {
      that.$router.push('/login');
    }

    if (that.$route.query.user_detail_id) {
      that.user_detail_id = that.$route.query.user_detail_id;
      that.detail();
    }

  },

  //方法
  methods: {
    /**
     * 获取用户详情
     */
    detail() {
      let that = this;

      //请求的数据
      let formData = {};
      formData.token = that.token;
      formData.user_id = that.user_detail_id;

      //请求邀请者列表
      that.$http.post(that.adminApi.api_url + "/User/user_details", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          var data = res.body;
          if (data) {
            that.formData.avatar_url = data.avatar_url;
            that.formData.area = data.province + data.city;
            that.formData.country = data.country;
            that.formData.create_time = data.create_time;
            that.formData.gender = data.gender == 1 ? '男' : '女';
            that.formData.mobile = data.mobile;
            that.formData.nickname = data.nickname;
            if (data.total_answer_count > 0) {
              that.formData.accuracy = (data.total_answer_success / data.total_answer_count * 100).toFixed(2) + '%';

              that.formData.total_answer_count = data.total_answer_count;
            } else {
              that.formData.accuracy = '暂无答题记录';
              that.formData.total_answer_count = '暂无答题记录';
            }
            
          }
        });
    },

    /**
     * 返回
     */
    go_back() {
      this.$router.go(-1);
    }
  }
}
