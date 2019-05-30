require(['layui', 'hdb', 'text!../tpl/commoncode.tpl', 'underscore', 'util', 'jquery', 'default', 'dialog'], function (layui, hdb, tpl, _, util, $, Default, dialog) {
    var template = hdb.compile(tpl);
    $("#common_code").html(template);
    var tableOptions = {
        id: 'code_table',
        title: '码表信息',
        elem: '#code_table',
        url: '/quryCode',
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'codeTypeName', title: '码表类型名称'},
            {field: 'codeFullName', title: '全称'},
            {field: 'codeName', title: '名称'},
            {field: 'bizCode', title: '码值', sort: true},
            {field: 'validFlag', title: '是否有效', sort: true},
            {field: 'createTime', title: '创建时间', sort: true},
            {field: 'modifyTime', title: '修改时间', sort: true},
            {field: 'rmk', title: '备注'},
            {fixed: 'right', width:155, align:'center', toolbar: '#code_table_bar'}
        ]]
    };
    //初始化table
    layui.use(['table', 'layer'], function () {
        var table = layui.table;
        var layer = layui.layer;
        table.render(_.extend(tableOptions, Default.table_config));
        table.on('tool(code_table)', function(obj){
            if(obj.event === 'detail'){

            } else if(obj.event === 'del'){
                if (_.isEqual('0', obj.data.validFlag)) {
                    dialog.message({msg: '此数据是失效状态，无须删除。'});
                    return;
                }
                layer.confirm('你确定要删除？', function(index){
                    if (index) {
                        layer.close(index);
                        delCommonCode(obj.data);
                    }
                });
            } else if(obj.event === 'edit'){

            }
        });
    });

    //删除
    function delCommonCode(data) {
        var url = '/modifyCode';
        var params = {
            codeId: data.codeId,
            validFlag: 0
        }
        util.ajax.postJson(url, params, function(status, data) {

        }, function() {

        });
    }

});