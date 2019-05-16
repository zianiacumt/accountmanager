require(['Page','hdbHelper'], function(Page, hdb) {

    function getValidateConfig() {
        var validateConfig = {
            "database.database_ip":{
                required: true
            },
            "database.database_port":{
                required: true
            },
            "database.database_type":{
                required: true
            },
            "database.userName":{
                required: true
            },
            "database.password":{
                required: true
            }
        }
        return validateConfig
    }

    function getComponents() {
        var components = {
            database:[
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
                        label: "端口",
                        defaultValue: "3306"
                    }
                },
                {
                    component:"select",
                    key: "database_type",
                    options:{
                        label: "数据库类型",
                        url:"/quryCode?codeTypeCd=COMMON_CODE@SEX",
                        name:"sex"
                    }
                },
                {
                    component:"input",
                    key: "userName",
                    options:{
                        label: "登录名"
                    }
                },
                {
                    component:"input",
                    key: "password",
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
        validateConfig: getValidateConfig(),
        components: getComponents(),
        tpl:"text!../../tpl/databaseinfo.tpl"
    }
    var page = new Page(pageConfig);

});