export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1,
      limit: 10,
      date: '',
      statistics: {}, //数据统计
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
    that.getList();
  },

  //方法
  methods: {
    /**
     * 获取列表
     */
    getList() {
      let that = this;
      that.tableData = [];
      //请求的数据
      let formData = {};
      formData.token = that.token;

      formData.page = that.page;
      formData.limit = that.limit;

      //时间条件
      if (that.date) {
        formData.start_time = that.formatDateTime(that.date[0]);
        formData.end_time = that.formatDateTime(that.date[1]);
      }

      that.$http.post(that.adminApi.api_url + "/User/user_statistics", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          var data = res.body;
          if (data) {
            that.tableData = data.user;
            that.statistics = data.total;
            that.count = data.count;
          }
        });
    },

    /**
     * 时间转换
     * @param date
     * @returns {string}
     */
    formatDateTime: function (date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      return y + '-' + m + '-' + d;
    },

    /**
     * 筛选
     */
    search: function () {
      let that = this;
      that.getList();
    },

    /**
     * 导出
     */
    export_flies() {
      window.location.href = this.adminApi.api_url + "/User/export_user_list?token=" + this.token;
    },

    /**
     * 查看详情
     */

    see_detail(id) {
      this.$router.push({
        path: '/user/shareRecord',
        query: {
          user_detail_id: id
        }
      })
    },

    /**
     * 下一页
     * @param currentPage
     */
    handleCurrentChange: function (currentPage) {
      var that = this;
      that.page = currentPage;
      that.getList();
    },
  }
}
