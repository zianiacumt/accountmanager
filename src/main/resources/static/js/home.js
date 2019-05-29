require(['underscore', 'util', 'layui', 'jquery', 'hdb', 'text!../tpl/home.tpl', 'dialog'], function (_, util, layui, $, hdb, tpl, dialog) {

    var _this = this;
    //查询菜单
    var url = '/getSelfMenus';
    var data = {};
    var menuUrl = {};
    util.ajax.postAsyncJson(url, data, function(data, textStatus, xhr) {
        if (data && data.returnCode =='0' && data.beans) {
            _.each(data.beans, function(item, index) {
                menuUrl[item.menuId] = item.menuUrl;
                if (_.has(item, 'subMenus')) {
                     _.each(item.subMenus, function(menu, index) {
                         menuUrl[menu.menuId] = menu.menuUrl;
                     });
                }
            });
            var template = hdb.compile(tpl);
            var html = template({menus: data.beans});
            this.$el = $("body").html(html);
            layui.use(['element'], function(){
                var element = layui.element;
                var heigth = $(window).height() - 60;
                $('#domain').attr('height', heigth);
            });
            initEvent();
        } else {
            var message = data.returnMsg? data.returnMsg: '获取主页信息失败';
            dialog.message({msg: message, time: 2000});
        }
    }, function(xhr, textStatus, errorThrown) {
        var message = '获取主页信息失败';
        dialog.message({msg: message, time: 2000});
    });

    //绑定事件
    function initEvent() {
        _this.$el.find("li > a").on('click', function(object){
            goPage(object);
        });
        _this.$el.find("dd > a").on('click', function(object){
            goPage(object);
        });
    }

    //跳转到菜单项
    function goPage(object) {
        var menuId = object.target.id;
        var menu_url = menuUrl[menuId] || '';
        if (!_.isEmpty(menu_url)) {
            $("#domain").attr("src", menu_url);
        }
    }

});