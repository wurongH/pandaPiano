export default {
  data: function () {
    return {
      user_name: '',
      passWord: '',
    }
  },
  methods: {
    //设置账号
    setAccount: function (val) {
      this.user_name = val;
    },
    //设置密码
    setPwd: function (val) {
      this.passWord = val;
    },
    //登陆
    Login: function () {
      var that = this;
      if (that.user_name === '') {
        that.$message({
          type: 'error',
          message: `操作提示: ${ '账号不能为空' }`
        });
        return;
      }
      if (that.passWord === '') {
        that.$message({
          type: 'error',
          message: `操作提示: ${  '请您输入密码' }`
        });
        return;

      }

      //请求登陆接口
      that.$http.post(that.adminApi.api_url + "/Login/login", {
        user_name: that.user_name,
        pass_word: that.passWord
      }, {
        emulateJSON: true
      }).then(
        function (res) {
          // 处理成功的结果
          //1,设置值到data
          that.adminApi.token = res.body.token;
          that.adminApi.user_name = res.body.user_name;
          that.adminApi.user_id = res.body.user_id;
          that.adminApi.identity = res.body.identity;
          that.adminApi.region_name = res.body.region_name;
          that.adminApi.seller_name = res.body.seller_name;

          //设置到缓存
          sessionStorage.setItem('access-token', res.body.token);
          sessionStorage.setItem('user_name', res.body.user_name);
          sessionStorage.setItem('user_id', res.body.user_id);
          sessionStorage.setItem('identity', parseInt(res.body.identity));
          sessionStorage.setItem('region_name', res.body.region_name);
          sessionStorage.setItem('seller_name', res.body.seller_name);

          that.$message({
            type: 'success',
            message: `操作提示: ${ '登陆成功' }`
          });
          //登录成功，把用户信息保存在sessionStorage中
          sessionStorage.setItem('access-token', this.adminApi.token);
          that.$router.push({
            path: '/index',
            name: 'index',
            params: {

            }
          });
        });
    },
  }
}
