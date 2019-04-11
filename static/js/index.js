export default {
  name: 'index',
  data() {
    var validOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      } else {
        if (this.ruleForm2.checkOldPass !== '') {
          this.$refs.ruleForm2.validateField('checkOldPass');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isCollapse: true,
      user_name: '',
      user_id: '',
      token: '',
      menuList: [],
      oneMenuName: '',
      twoMenuName: '',
      threeMenuName: '',
      key: 0,
      ruleForm2: {
        pass: '',
        checkPass: '',
        OldPass: ''
      },
      rules2: {
        checkOldPass: [{
          validator: validOldPass,
          trigger: 'blur'
        }],
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],
      },
      dialogVisible: false,
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
    //获取菜单列表
    that.getMenuList();
  },

  //要执行的方法
  methods: {
    //一级菜单下标
    handleOpen(key) {
      var that = this;
      that.key = key;
    },
    //二级下单下标
    checkChild: function (e, key) {
      var that = this;
      that.oneMenuName = that.menuList[key].name;
      that.twoMenuName = that.menuList[key].child[e].name;
      that.threeMenuName = '';
      that.$router.push(that.menuList[key].child[e].url);
      that.isCollapse = true;
    },

    //三级下单下标
    checkThreeChild: function (e, key, z) {
      var that = this;
      that.oneMenuName = that.menuList[key].name;
      that.twoMenuName = that.menuList[key].child[e].name;
      that.threeMenuName = that.menuList[key].child[e].child[z].name;
      that.$router.push(that.menuList[key].child[e].child[z].url);
      that.isCollapse = true;
    },

    //退出登陆
    logout: function () {
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user_id');
        _this.$router.push('/login');
      }).catch(() => {

      });
    },

    //请求菜单api
    getMenuList: function () {
      var that = this;
      //请求登陆接口
      that.$http.post(that.adminApi.api_url + "/Basic/getAllMenu", {
        user_id: that.user_id,
        token: that.token
      }, {
        emulateJSON: true
      }).then(
        function (res) {
          if (res.status === 200) {
            // 处理成功的结果
            that.$router.push(res.body[0].child[0].url);
            for (var i in res.body) {
              res.body[i].img = 'http://p9hpc0p5x.bkt.clouddn.com/icon' + (parseInt(i) + 1) + '.png';
            }
            that.menuList = res.body;
            that.oneMenuName = res.body[0].name;
            that.twoMenuName = res.body[0].child[0].name;
          }
        },
        function () {
          // 处理失败的结果
          that.$router.push('/login');
        });
    },

    //提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.editPass();
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.ruleForm2 = {
            pass: '',
            checkPass: '',
            checkOldPass: ''
          };
        })
        .catch(_ => {});
	},
	
	/**
	 * 修改密码页面
	 */
	edit_password() {
		this.$router.push('/user/edit_pwd');
	},

    //修改密码api
    editPass: function () {
      var that = this;
      that.$http.post(that.adminApi.api_url + "/api/Manager/editPassword", {
        id: that.user_id,
        token: that.token,
        old_password: that.ruleForm2.OldPass,
        newPassword: that.ruleForm2.pass,
        newConfirmPassword: that.ruleForm2.checkPass
      }, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          that.$message({
            type: 'success',
            message: `操作提示: ${ '修改成功' }`
          });
          that.ruleForm2 = {
            pass: '',
            checkPass: '',
            checkOldPass: ''
          };
          that.dialogVisible = false;
        });
    }
  }
}
