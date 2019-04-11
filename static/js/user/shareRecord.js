export default {
  data() {
    return {
      formData: {},
      shareData: [],
      pullData: [],
      user_detail_id: ''
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
     * 显示详情
     */
    detail: function () {
      const that = this;

      // 参数
      const formData = {};
      formData.token = that.token;
      formData.user_id = that.user_detail_id;

      //发请求
      that.$http.post(that.adminApi.api_url + "/User/user_view_details", formData, {
        emulateJSON: true
      }).then(function (res) {
          var data = res.body;
          if (data) {
            that.formData.nickname = data.nickname;
            that.formData.avatar_url = data.avatar_url;
            that.formData.share = data.share <= 0 ? '暂无' : data.share;
            that.formData.pullnew = data.pullnew <= 0 ? '暂无' : data.pullnew;

            // 分享表格数据
            that.shareData = data.shareData;
            // 进入时间表格数据
            that.pullData = data.pullData;
          }
        });
    },
  }
}
