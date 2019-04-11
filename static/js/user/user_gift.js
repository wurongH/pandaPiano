export default {
  data() {
    return {
      tableData: [],
      name: '',
      count: 0,
      page: 1,
      limit: 10,
      date: '',
      type: '1'
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

      //时间条件
      if (that.date) {
        formData.create_time = that.formatDateTime(that.date[0]);
        formData.last_time = that.formatDateTime(that.date[1]);
      }

      formData.type = that.type;

      formData.page = that.page;
      formData.limit = that.limit;

      if (that.name) {
        formData.keys = that.name;
      }
      //请求邀请者列表
      that.$http.post(that.adminApi.api_url + "/User/user_list", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          if (res.body) {
            var data = res.body.list;
            for (var i = 0; i < data.length; i++) {
              data[i].gender = data[i].gender == 1 ? '男' : '女';
              if (data[i].total_answer_count > 0) {
                data[i].accuracy = (data[i].total_answer_success / data[i].total_answer_count * 100).toFixed(2) + '%';
              } else {
                data[i].accuracy = '暂无'
              }
            }

            that.tableData = data;
            that.count = res.body.count;
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
      let that = this;
      let url = this.adminApi.api_url + "/User/export_user_list?token=" + this.token;
      url += '&type='+that.type;
      url += '&keys='+that.name;
      //时间条件
      if (that.date) {
        let start_time = that.formatDateTime(that.date[0]);
        let end_time = that.formatDateTime(that.date[1]);
        url += '&create_time=' + start_time;
        url += '&last_time=' + end_time;
      }
      window.location.href = url;
    },

    /**
     * 查看详情
     */

    see_detail(id) {
      this.$router.push({
        path: '/user/userDetail',
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
