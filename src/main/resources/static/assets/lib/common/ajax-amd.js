define(['jquery'], function() {
    var config = {
        dataType:{
            HTML: "html",
            TEXT: "text",
            JSON: "json"
        },
        TIME_OUT:6000
    }

    var ajax = {
        ajax: function(options) {
            var config = $.extend({
                "type": "post",
                "dataType": "json",
                timeout: 3000
            }, options);
            return $.ajax(config);
        },
        postJson: function(url, params, callback, sync) {
            _ajaxBase(url, "POST", params, config.dataType.JSON, callback, sync);
        }
    }

    var _ajaxBase = function(url, type, params, dataType, callback, sync) {
        return $.ajax({
            url: url,
            type: type,
            data: params,
            dataType: dataType,
            async: !sync,
            timeout:config.TIME_OUT,
            beforeSend: function(xhr) {
                xhr.overrideMimeType("text/plain;charset=utf-8");
            },
            success: function(data, textStatus, xhr) {
                successCallback(data, callback);
            },
            error: function(data, textStatus, xhr) {
                failCallback(data, callback);
            }
        });
    }

    var successCallback = function(data, callback) {
        if (callback) {
            callback(data);
        }
    }

    var failCallback = function(data, callback) {
        if (callback) {
            callback(data);
        }
    }

    return ajax;
});