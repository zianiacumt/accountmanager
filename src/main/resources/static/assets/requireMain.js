
function urlArgs(){
    return function (name, path) {
        if (this.paths[name] && this.paths[name].indexOf("?v=") > -1) {
            return '';
        }
        return "?v=1519632966437";
    }
}

var require = {
    baseUrl: "/assets/lib",
    paths: {
        "jquery": "jquery/jquery",
        "backbone": "backbone/a",
        "hdb": "handlebars/handlebars_v4.0.4",
        "hdbHelper": "handlebars/helpers",
        "underscore": "underscore/underscore",
        "layui": "layui/layui.all",
        "ajax": "common/ajax-amd",
        "Util": "common/Util",
        "Page": "page/page"
    },
    shim: {
        "hdb": {exports:"Handlebars"},
        "layui": {exports: "LayUI"}
    },
    waitSeconds: 0,
    urlArgs:urlArgs()
}

var requierConfig = require;