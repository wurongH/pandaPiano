export default {
    data() {
        return {
            name: '',
            tableData: [],
            page: 1,
            limit: 10,
            count: 0,
            type: 1,
            src: '',
            identity: '', //管理人员人份
            date: '',
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
        that.getList();
        if (that.$route.query.type) {
            that.type = parseInt(that.$route.query.type);
        }
    },

    //方法
    methods: {
        /**
         * 获取列表
         */
        getList() {
            var that = this;
            that.tableData = [];
            //请求的数据
            var formData = {};
            formData.token = that.token;
            formData.type = that.type;

            if (that.name) {
                formData.key = that.name;
            }

            formData.page = that.page;
            formData.limit = that.limit;

            //请求邀请者列表
            that.$http.post(that.adminApi.api_url + "/channel/index", formData, {
                emulateJSON: true
            }).then(
                function (res) {
                    // 处理成功的结果
                    if (res.body.list) {
                        for (var i in res.body.list) {
                            if (res.body.list[i].status === 2) {
                                var status = false;
                            } else {
                                var status = true;
                            }
                            that.tableData.push({
                                i: i,
                                id: res.body.list[i].id,
                                title: res.body.list[i].title,
                                link: res.body.list[i].channel_url,
                                total_user_count: res.body.list[i].total_user_count,
                                register_count: res.body.list[i].register_count,
                                status: status,
                                src: that.src = that.adminApi.api_url + '/channel/get_code?id=' + res.body.list[i].id,
                                video_count: res.body.list[i].video_count
                            });
                        }
                        that.count = res.body.count;
                    } else {
                        that.count = 0;
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
         * 搜索
         */
        search: function () {
            let that = this;
            that.page = 1;
            that.getList();
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

        /**
         * 添加
         */
        addChannel: function () {
            var that = this;
            that.$router.push({
                path: '/megagame/channel_add'
            });
        },

        /**
         * 修改
         * @param id
         */
        edit: function (id) {
            var that = this;
            that.$router.push({
                path: '/megagame/channel_add',
                query: {
                    channel_id: id
                }
            });
        },


        /**
         * 下载小程序码
         */
        downLoad: function (e) {
            var that = this;
            //请求登陆接口
            that.$http.post(that.adminApi.api_url + "/channel/get_code", {
                token: that.token,
                id: e
            }, {
                emulateJSON: true
            }).then(
                function (res) {
                    // 处理成功的结果
                    that.$message({
                        type: 'success',
                        message: `操作提示: ${ '下载成功' }`
                    });
                },
                function (res) {
                    // 处理失败的结果
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ res.body.msg }`
                    });
                });
        },

        /**
         * 删除
         * @param e
         */
        deleteBrand: function (e) {
            var that = this;
            that.$confirm('此操作将永久删除该渠道, 是否继续?', '提示', {
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
            that.$http.post(that.adminApi.api_url + "/channel/del", {
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
                },
                function (res) {
                    // 处理失败的结果
                    that.$message({
                        type: 'error',
                        message: `操作提示: ${ res.body.msg }`
                    });
                });
        },

        //时间转换
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
         * 跳转统计 页面
         */
        to_statistics(id) {
            this.$router.push({
                path: '/megagame/statistics',
                query: {
                    channel_id: id
                }
            })
        },

        /**
         * 导出
         */
        export_file() {
            var that = this;
            window.location.href = that.adminApi.api_url + '/experience/channel_list?token=' + that.token + '&key=' + that.name + '&type=' + that.type;
        },
    }
}
