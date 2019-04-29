require(['underscore', 'jquery', 'backbone', 'hdbHelper','text!../../tpl/signIn.tpl', 'Util'],
    function(_, jquery, Backbone, hdb, tpl, Util) {

        var page = Backbone.View.extend({
            initialize: function() {
                var template = hdb.compile(tpl);
                $("body").html(template);
                $("#signIn").on("click", function(){
                    var userName = $("#userName").val();
                    var passWord = $("#passWord").val();
                    if (_.isEmpty(userName)) {
                     alert("用户名不能为空");
                     return;
                    }
                    if (_.isEmpty(passWord)) {
                     alert("密码不能为空");
                     return;
                    }
                    var url = "../signIn";
                    var params = {
                        userName: userName,
                        passWord: passWord
                    }
                    Util.ajax.postJson(url, params, function(data) {
                        console.log(data);
                        if (data && data.returnCode == "0") {
                            window.location.href = "account.html";
                        } else {
                            console.log(data);
                            alert("登陆失败");
                        }
                    }, this, function(data) {
                        console.log(data);
                        alert("登陆失败");
                    });
                });
            }
        });

        this.page = new page();
});