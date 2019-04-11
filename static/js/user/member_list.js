export default {
  data() {
    return {
      tableData: [],
      key_words: '',
      count: 0,
      page: 1,
      limit: 10,
      select_data: [], //下拉选择 数据
      course_id: '', //科目id
      nick_name: '', //昵称手机号
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
    that.get_select_data();
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

      if (that.key_words) {
        formData.key = that.key_words;
      }

      if (that.course_id) {
        formData.course_id = that.course_id;
      }

      if (that.nick_name) {
        formData.content = that.nick_name;
      }

      //请求邀请者列表
      that.$http.post(that.adminApi.api_url + "/User/user_answer_log", formData, {
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
     * 导出表格
     */
    export_files() {
      var that = this;
      var content = that.content ? that.content : '';
      var key_words = that.key_words ? that.key_words : '';
      var course_id = that.course_id ? that.course_id : '';

      window.location.href = this.adminApi.api_url + '/User/export_answer_log?token=' + this.token + '&content=' + content + '&keys=' + key_words + '&course_id=' + course_id;
    },

    /**
     * 获取下拉选择是数据
     */
    get_select_data() {
      var that = this;

      var formData = {
        token: that.token
      }

      that.$http.post(that.adminApi.api_url + "/Modular/modular_list_open", formData, {
        emulateJSON: true
      }).then(function (res) {
        if (res.body) {
          var data = res.body.list;
          for (var i = 0; i < data.length; i++) {
            that.select_data.push({
              name: data[i].name,
              course_id: data[i].course_id,
            })
          }
        }
      })
    },

    /**
     * 筛选
     */
    search: function () {
      let that = this;
      that.getList();
    },

    /**
     * 添加
     */
    addRegion: function () {
      let that = this;
      that.$router.push({
        path: '/megagame/addTitle'
      });
    },


    /**
     * 修改
     * @param id
     */
    edit: function (id) {
      var that = this;
      that.$router.push({
        path: '/megagame/region_add',
        query: {
          region_id: id
        }
      });
    },


    /**
     * 删除
     * @param e
     */
    deleteRow: function (e) {
      var that = this;
      that.$confirm('此操作将永久删除该赛区, 是否继续?', '提示', {
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
      that.$http.post(that.adminApi.api_url + "/Region/del", {
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
