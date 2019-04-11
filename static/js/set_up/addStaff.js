export default {
  data() {
    return {
      staff_id: 0,
      formData: {
        username: '',
        password: '',
        name: '',
        phone_num: '',
        auth: '1'
      },
      rules: {
        username: [{
          required: true,
          message: '请输入输手机号码',
          trigger: 'blur'
        }, ],
        name: [{
          required: true,
          message: '请选择姓名',
          trigger: 'blur'
        }, ],
        password: [{
          required: true,
          message: '请选择姓名',
          trigger: 'blur'
        }, ],
        phone_num: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }, ]
      },
    };
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
    if (that.$route.query.id) {
      that.staff_id = that.$route.query.id;
      that.detail();
    }
  },

  methods: {

    /**
     * 获取数据
     */
    detail: function () {
      var that = this;
      //请求登陆接口
      that.$http.post(that.adminApi.api_url + "/Manager/show_edit", {
        token: that.token,
        id: that.staff_id,
      }, {
        emulateJSON: true
      }).then(
        function (res) {

          that.formData.username = res.body.username;
          that.formData.phone_num = res.body.mobile;
          that.formData.name = res.body.truename;
          that.formData.auth = res.body.identity.toString();

        });
    },

    /**
     * 保存
     */
    submitForm: function (formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.staff_id == 0) {
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
     * 添加员工
     */
    add: function () {
      const that = this;

      //请求的数据
      var formData = {};
      formData.token = that.token;
      formData.mobile = that.formData.phone_num;
      formData.username = that.formData.username;
      formData.truename = that.formData.name;
      formData.password = that.formData.password;
      formData.identity = that.formData.auth;

      //请求api
      that.$http.post(that.adminApi.api_url + "/Manager/add", formData, {
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
     * 修改员工
     */
    edit: function () {
      const that = this;

      //请求的数据
      var formData = {};
      formData.token = that.token;
      formData.mobile = that.formData.phone_num;
      formData.truename = that.formData.name;
      formData.username = that.formData.username;
      formData.password = that.formData.password;
      formData.identity = that.formData.auth;
      formData.id = that.staff_id;

      //请求api
      that.$http.post(that.adminApi.api_url + "/Manager/edit", formData, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          that.$message({
            type: 'success',
            message: '操作提示: 修改成功'
          });
          that.$router.back(-1);
        });
    },



  }
}
