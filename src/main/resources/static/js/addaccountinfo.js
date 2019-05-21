define(['Page','hdbHelper', "jquery", 'Util'], function(Page, hdb, $, Util) {


    function getTemplate() {
        var template = {
            baseForm1: [
                {
                    component: "input",
                    key: "account_address",
                    options: {
                        label: "账号地址"
                    }
                }
            ],
            baseForm2: [
                {
                    component: "select",
                    key: "account_used_type",
                    options: {
                        label: "账号用途类型",
                        url: "quryCodeByCodeTypeCd?codeTypeCd=COMMON_CODE@ACCOUNT_USED_TYPE"
                    }
                },
                {
                    component: "input",
                    key: "account_name",
                    options: {
                        label: "账号名"
                    }
                },
                {
                    component: "input",
                    key: "account_password",
                    options: {
                        label: "账号密码"
                    }
                },
                {
                    component: "input",
                    key: "account_start_time",
                    options: {
                        label: "账号有效开始时间"
                    }
                },
                {
                    component: "input",
                    key: "account_end_time",
                    options: {
                        label: "账号有效结束时间"
                    }
                },
                {
                    component: "select",
                    key: "account_valid_flag",
                    options: {
                        label: "账号是否有效",
                        disabled: true,
                        value: "1",
                        url: "quryCodeByCodeTypeCd?codeTypeCd=COMMON_CODE@VALID_FLAG"
                    }
                }
            ],
            baseForm3: [
                {
                    component: "textarea",
                    key: "account_rmk",
                    options: {
                        label: "账号备注说明"
                    }
                }
            ]
        }
        return template;
    }

    var pageConfig = {
        el:$("#main"),
        components: getTemplate(),
        tpl:"text!../../tpl/addaccountinfo.tpl",
        events: {
            "click #submit": "submit"
        },
        eventsHandle: {
            "submit": _.bind(submit, this)
        }
    }
    this.page = new Page(pageConfig);

    //提交
    function submit(){

    }

});