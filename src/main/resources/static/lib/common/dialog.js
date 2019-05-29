define(['layui'], function (layui) {

    //加载框
    var showLoading = function(options) {
        layui.use(['layer'], function(options) {
            var layer = layui.layer;
            return layer.load(options);
        });
    }

    //关闭加载
    var closeLoad = function(object) {
        layui.use(['layer'], function(options) {
            var layer = layui.layer;
            layer.close(object);
        });
    }

    //弹出消息框
    var message = function(options) {
        var time = options.time? options.time:2000;
        layui.use(['layer'], function() {
            var layer = layui.layer;
            layer.msg(options.msg, {time: time});
        });
    }

    return {
        showLoading: showLoading,
        closeLoad: closeLoad,
        message: message
    }

});