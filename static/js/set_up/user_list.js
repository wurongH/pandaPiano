export default {
  data() {
    return {
      tableData: [],
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
      //请求的数据
      let formData = {};
      formData.token = that.token;
      formData.id = that.user_id;

      formData.page = that.page;
      formData.limit = that.limit;

      //请求邀请者列表
      that.$http.post(that.adminApi.api_url + "/Manager/index", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          var data = res.body;
          if (data) {
              that.tableData = data.list.list;
            that.count = data.list.count;
          }
        });
    },

    /**
     * 添加
     */
    addRegion: function () {
      let that = this;
      that.$router.push({
        path: '/set_up/addStaff'
      });
    },


    /**
     * 修改
     * @param id
     */
    edit: function (id) {
      var that = this;
      that.$router.push({
        path: '/set_up/addStaff',
        query: {
          id: id
        }
      });
    },


    /**
     * 删除
     * @param e
     */
    deleteRow: function (e) {
      var that = this;
      that.$confirm('此操作将永久删除该 员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.doDelete(e);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //执行删除
    doDelete: function (e) {
      var that = this;
      //请求登陆接口
      that.$http.post(that.adminApi.api_url + "/Manager/del", {
        token: that.token,
        id: e
      }, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          that.$message({
            type: 'success',
            message: `操作提示: ${ '删除成功' }`
          });
          that.getList();
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
