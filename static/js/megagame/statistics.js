export default {
    data() {
        return {
            tableData: [],
            page: 1,
            limit: 10,
            count: 0,
            channel_id: '',
        }
    },
    //进入页面加载
    mounted: function () {
        var that = this;
        //在缓存中获取值
        that.user_name = sessionStorage.getItem("user_name");
        that.user_id = sessionStorage.getItem("user_id");
        that.token = sessionStorage.getItem("access-token");
        that.identity = parseInt(sessionStorage.getItem("identity"));

        if ((!that.token) || (!that.user_id) || (!that.user_name)) {
            that.$router.push('/login');
        }
        if (that.$route.query.channel_id) {
            that.channel_id = that.$route.query.channel_id;
            that.getList();
        }
    },

    //方法
    methods: {
        /**
         * 获取列表
         */
        getList() {
            var that = this;

            //请求的数据
            var formData = {};
            formData.token = that.token;
            formData.channel_id = that.channel_id;

            //请求邀请者列表
            that.$http.post(that.adminApi.api_url + "/channel/every_day_user_count", formData, {
                emulateJSON: true
            }).then(
                function (res) {
                    var data = res.body;
                    if (data) {

                        var arr = [];
                        for (var k in data.list) {
                            data.list[k].date = k;
                            arr.push(data.list[k])
                        }

                        that.count = data.count;
                        that.tableData = arr.reverse();
                    }
                },
                function () {
                    // 处理失败的结果
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ '处理异常' }`
                    });
                });
        },

        /**
         * 下一页
         * @param currentPage
         */
        handleCurrentChange: function (currentPage) {
            var that = this;
            that.page = currentPage;
        },
    }
}
