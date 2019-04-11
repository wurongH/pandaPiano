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
  },

  //要执行的方法
  methods: {
    //提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.editPass();
        } else {
          return false;
        }
      });
    },

    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //修改密码api
    editPass: function () {
      var that = this;

      console.log(that.ruleForm2.OldPass.toString().trim(), that.ruleForm2.pass.trim(), that.ruleForm2.checkPass.trim())

      that.$http.post(that.adminApi.api_url + "/Manager/editPassword", {
        id: that.user_id,
        token: that.token,
        old_password: that.ruleForm2.OldPass.toString().trim(),
        newPassword: that.ruleForm2.pass.trim(),
        newConfirmPassword: that.ruleForm2.checkPass.trim()
      }, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          that.$message({
            type: 'success',
            message: `操作提示: ${ '修改成功' }`
          });

          sessionStorage.removeItem('user_id');
          that.$router.push('/login');

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
