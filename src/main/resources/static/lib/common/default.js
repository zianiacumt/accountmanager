define(function() {

    var table_config = {
        height: 350,
        toolbar: true,
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

    return {
        table_config: table_config
    }

});