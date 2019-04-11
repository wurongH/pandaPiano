export default {
  data() {
    return {
      tableData: [],
      name: '',
      count: 0,
      page: 1,
      limit: 10,
      select_data: [], //下拉框数据
      course_id: '', //模块id
      key_words: '', //关键字
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

      if (that.course_id) {
        formData.course_id = that.course_id;
      }

      if (that.key_words) {
        formData.key = that.key_words;
      }

      formData.page = that.page;
      formData.limit = that.limit;

      //请求邀请者列表
      that.$http.post(that.adminApi.api_url + "/Subject/subject_list", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          if (res.body) {
            var data = res.body.list;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                if (data[i].answer_total_count > 0) {
                  data[i].accuracy = (data[i].answer_success_count / data[i].answer_total_count * 100).toFixed(2) + '%';
                } else {
                  data[i].accuracy = '暂无答题记录'
                }
              }
              that.tableData = data;
              that.count = res.body.count;
            } else {
              that.count = 1;
            }
          }

        });
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
        path: '/megagame/addTitle',
        query: {
          subject_id: id
        }
      });
    },


    /**
     * 删除
     * @param e
     */
    deleteRow: function (course_id, subject_id) {
      var that = this;
      that.$confirm('此操作将永久删除该赛区, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.doDelete(course_id, subject_id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //执行删除
    doDelete: function (course_id, subject_id) {
      var that = this;
      //请求登陆接口
      that.$http.post(that.adminApi.api_url + "/Subject/subject_del", {
        token: that.token,
        course_id: course_id,
        subject_id: subject_id
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
