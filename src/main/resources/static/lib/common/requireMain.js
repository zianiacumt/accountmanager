function urlArgs(){
    return function (name, path) {
        if (this.paths[name] && this.paths[name].indexOf("?v=") > -1) {
            return '';
        }
        return "?v=1519632966437";
    }
}

var require = {
    baseUrl: "/lib/",
    paths: {
        'jquery': 'jquery/jquery',
        'backbone': 'backbone/a',
        'hdb': 'handlebars/handlebars_v4.0.4',
        'hdbr': 'handlebars/handlebars.runtime',
        'hdbHelper': 'handlebars/helpers',
        'underscore': 'underscore/underscore',
        'util': 'common/util',
        'ajax': 'common/ajax',
        'layui': 'layui/layui',
        'dialog': 'common/dialog'
    },
    waitSeconds: 0,
    shim: {
        'hdb': {exports: 'Handlebars'},
        'layui': {exports: 'layui'}
    },
    urlArgs: urlArgs()
};

var requireConfig = require;