define(['jquery', 'underscore'], function($, _) {

    var config = {
        type:{
            post: 'post',
            get: 'get',
            delete: 'delete',
            put: 'put'
        },
        dateType:{
            xml: 'xml',
            html: 'html',
            script: 'script',
            json: 'json',
            jsonp: 'jsonp',
            text: 'text'

        },
        async:{
            async: true,
            sync:true
        },
        timeout:3000,
        cache: {
            cache_yes: true,
            cache_no: false
        }
    }

    var ajax_send = function(url, type, dataType, async, data, succallback, errcallback) {
        var cache = config.cache.cache_no;
        if (_.isEqual(dataType, config.dateType.html)) {
            cache = config.cache.cache_yes;
        }
        return $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: dataType,
            async: async,
            timeout: config.timeout,
            cache: cache,
            beforeSend: function(xhr) {
                xhr.overrideMimeType('text/plain; charset=utf-8')
            },
            success: function (data, textStatus, xhr) {
                succallback(data, textStatus, xhr);
            },
            error: function (xhr, textStatus, errorThrown) {
                errcallback(xhr, textStatus, errorThrown);
            }
        });
    }


    var ajax = {

        //同步get dataType:json
        getJson: function(url, data, succallback, errcallback) {
            ajax_send(url, config.type.get, config.dateType.json, config.async.sync, data, succallback, errcallback);
        },

        //异步get dateType:json
        getAsyncJson: function(url, data, succallback, errcallback) {
            ajax_send(url, config.type.get, config.dateType.json, config.async.async, data, succallback, errcallback);
        },

        //同步post dataType:json
        postJson: function(url, data, succallback, errcallback) {
            ajax_send(url, config.type.post, config.dateType.json, config.async.sync, data, succallback, errcallback);
        },

        //异步post dateType:json
        postAsyncJson: function(url, data, succallback, errcallback) {
            ajax_send(url, config.type.post, config.dateType.json, config.async.async, data, succallback, errcallback);
        }

    }

    return ajax;

});