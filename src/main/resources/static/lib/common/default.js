define(function() {

    var table_config = {
        height: 350,
        defaultToolbar: ['filter', 'exports', 'print'],
        loading: true,
        even: true,
        page: true,
        limit: 10,
        limits: [10, 20, 50],
        parseData: function(res) {
            return {
                "code": res.returnCode,
                "msg": res.returnMsg,
                "count": res.total,
                "data": res.beans
            };
        }
    }

    var date_config = {
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        calendar: true
    }

    return {
        table_config: table_config,
        date_config: date_config
    }

});