require(['layui', 'hdb', 'text!../tpl/commoncode.tpl', 'underscore', 'util', 'jquery', 'default', 'dialog'], function (layui, hdb, tpl, _, util, $, Default, dialog) {

    var table;
    var layer;
    var laydate;
    var template = hdb.compile(tpl);
    $("#common_code").html(template);

    //初始化查询元素
    layui.use('laydate', function(){
        laydate = layui.laydate;
        laydate.render(_.extend(
            {
                elem: '#createStartTime'
            }
        , Default.date_config));
        laydate.render(_.extend(
            {
                elem: '#createEndTime'
            }
        , Default.date_config ));
        laydate.render(_.extend(
            {
                elem: '#modifyStartTime'
            }
            , Default.date_config));
        laydate.render(_.extend(
            {
                elem: '#modifyEndTime'
            }
            , Default.date_config ));
    });

    //绑定事件
    initEvent();

    function initEvent() {
        $('#serach').on('click', function() {
            var params = {
                codeTypeName: $('#codeTypeName').val(),
                codeName: $('#codeName').val(),
                validFlag: $('#validFlag').val(),
                createStartTime: $('#createStartTime').val(),
                createEndTime: $('#createEndTime').val(),
                modifyStartTime: $('#modifyStartTime').val(),
                modifyEndTime: $('#modifyEndTime').val()
            }
            tableOptions['where'] = params;
            table.reload('code_table', _.extend(tableOptions));
        });
        $('#reset').on('click', function() {
            $('#codeTypeName').val('');
            $('#codeName').val('');
            $('#validFlag').val('');
            $('#createStartTime').val('');
            $('#createEndTime').val('');
            $('#modifyStartTime').val('');
            $('#modifyEndTime').val('');
        });
    }

    var tableOptions = {
        id: 'code_table',
        title: '码表信息',
        elem: '#code_table',
        url: '/quryCodeByLike',
        toolbar: '#toolbar_add',
        cols: [[
            {type: 'radio', fixed: 'left'},
            {field: 'codeTypeName', title: '码表类型名称'},
            {field: 'codeFullName', title: '全称'},
            {field: 'codeName', title: '名称'},
            {field: 'bizCode', title: '码值', sort: true},
            {field: 'validFlag', title: '是否有效', sort: true},
            {field: 'createTime', title: '创建时间', sort: true},
            {field: 'modifyTime', title: '修改时间', sort: true},
            {field: 'rmk', title: '备注'},
            {fixed: 'right',title: '操作', width:155, align:'center', toolbar: '#code_table_bar'}
        ]]
    };
    //初始化table
    layui.use(['table', 'layer'], function () {
        table = layui.table;
        layer = layui.layer;
        table.render(_.extend(tableOptions, Default.table_config));
        table.on('tool(code_table)', function(obj){//监听table事件
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
                        table.reload('code_table', tableOptions);
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