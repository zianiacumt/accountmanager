require(['Page','hdbHelper', "jquery", 'Util'], function(Page, hdb, $, Util) {

    function getValidateConfig() {
        var validateConfig = {
            "database.database_version":{
                required: true,
                msg: "请填写数据库版本信息"
            },
            "database.database_type":{
                required: true,
                msg: "请选择数据库类型信息"
            },
            "database.database_ip":{
                required: true,
                msg: "请填写数据库ip信息"
            },
            "database.database_port":{
                required: true,
                msg: "请填写数据库端口信息"
            },
            "database.database_username":{
                required: true,
                msg: "请填写数据库用户名信息"
            },
            "database.database_password":{
                required: true,
                msg: "请填写数据库密码信息"
            },
            "databaseremark.remark": {
                required: true,
                msg: "请填写备注信息"
            }
        }
        return validateConfig
    }

    function getComponents() {
        var components = {
            database:[
                {
                    component:"input",
                    key: "database_version",
                    options:{
                        label: "数据库版本"
                    }
                },
                {
                    component:"select",
                    key: "database_type",
                    options:{
                        label: "数据库类型",
                        url:"/quryCode?codeTypeCd=COMMON_CODE@SEX"
                    }
                },
                {
                    component:"input",
                    key: "database_ip",
                    options:{
                        label: "ip"
                    }
                },
                {
                    component:"input",
                    key: "database_port",
                    options:{
                        label: "端口"
                    }
                },
                {
                    component:"input",
                    key: "database_username",
                    options:{
                        label: "登录名"
                    }
                },
                {
                    component:"input",
                    key: "database_password",
                    options:{
                        label: "登录密码"
                    }
                }
            ],
            databaseremark:[
                {
                    component:"textarea",
                    key: "remark",
                    options:{
                        label: "备注"
                    }
                }
            ]
        }
        return components;
    }
    var pageConfig = {
        el:$("#main"),
        validation: getValidateConfig(),
        components: getComponents(),
        tpl:"text!../../tpl/databaseinfo.tpl",
        events: {
            "click #submit": "submit"
        },
        eventsHandle: {
            "submit": _.bind(submit, this)
        }
    }
    this.page = new Page(pageConfig);

    function submit() {
        var param = $.serialize("baseForm");
        console.log(form);
        var url = "addCode";

        Util.ajax.postJson(url, param, function(data) {

        }, this, function(data) {

        });
    }

});