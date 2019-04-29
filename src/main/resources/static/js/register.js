require(['backbone', 'text!../../tpl/register.tpl', 'hdbHelper'], function(Backbone, tpl, hdb) {

    var page = Backbone.View.extend({
        initialize: function() {
            var template = hdb.compile(tpl);
            $("body").html(template);
            $("#register").on("click", function() {

            });
        }
    });

    this.page = new page();
});