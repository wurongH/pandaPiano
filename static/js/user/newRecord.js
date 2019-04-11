export default {
  data() {
    return {
      tableData: [],
      name: '',
      count: 0,
      page: 1,
      limit: 10,
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

      let formData = {};
      formData.token = that.token;

      formData.page = that.page;
      formData.limit = that.limit;

      that.$http.post(that.adminApi.api_url + "/User/user_pull", formData, {
        emulateJSON: true
      }).then(
        function (res) {
            var data = res.body;
            if (data) {
                that.tableData = data.list;
                that.count = data.count;
            }
        });
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
