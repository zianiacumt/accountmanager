define(['hdb', 'hdbHelper'], function(Handlebars) {

    return Handlebars.template({
        "1":function(container,depth0,helpers,partials,data,blockParams) {
            var stack1;

            return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.options : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.program(32, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "");
        },
        "2":function(container,depth0,helpers,partials,data,blockParams) {
        var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

        return ((stack1 = (helpers.if_component || (depth0 && depth0.if_component) || alias2).call(alias1,(depth0 != null ? depth0.component : depth0),{"name":"if_component","hash":{"compare":"textarea"},"fn":container.program(3, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
            + ((stack1 = (helpers.if_component || (depth0 && depth0.if_component) || alias2).call(alias1,(depth0 != null ? depth0.component : depth0),{"name":"if_component","hash":{"compare":"input"},"fn":container.program(14, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
            + ((stack1 = (helpers.if_component || (depth0 && depth0.if_component) || alias2).call(alias1,(depth0 != null ? depth0.component : depth0),{"name":"if_component","hash":{"compare":"select"},"fn":container.program(16, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
            + ((stack1 = (helpers.if_component || (depth0 && depth0.if_component) || alias2).call(alias1,(depth0 != null ? depth0.component : depth0),{"name":"if_component","hash":{"compare":"selectTree"},"fn":container.program(19, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
            + ((stack1 = (helpers.if_component || (depth0 && depth0.if_component) || alias2).call(alias1,(depth0 != null ? depth0.component : depth0),{"name":"if_component","hash":{"compare":"date"},"fn":container.program(21, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
            + ((stack1 = (helpers.if_component || (depth0 && depth0.if_component) || alias2).call(alias1,(depth0 != null ? depth0.component : depth0),{"name":"if_component","hash":{"compare":"radios"},"fn":container.program(23, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
        },
        "3":function(container,depth0,helpers,partials,data) {
        var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

        return "<li component=\""
            + alias2(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
            + "\" style='height: 70px; line-height: 70px'"
            + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.liClassName : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
            + "><label for=\""
            + alias2(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
            + "\">"
            + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.label : stack1), depth0)) != null ? stack1 : "")
            + "</label><div><textarea name=\""
            + alias2(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
            + "\""
            + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.inputClassName : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
            + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.defaultValue : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
            + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.readonly : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
            + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.disabled : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
            + "></textarea></div></li>";
        },
        "4":function(container,depth0,helpers,partials,data) {
            var stack1;

            return " class=\""
                + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.liClassName : stack1), depth0))
                + "\" ";
        },
        "6":function(container,depth0,helpers,partials,data) {
            var stack1;

            return " class=\""
                + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.inputClassName : stack1), depth0))
                + "\" ";
        },
        "8":function(container,depth0,helpers,partials,data) {
            var stack1;

            return " value=\""
                + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.defaultValue : stack1), depth0))
                + "\" ";
        },
        "10":function(container,depth0,helpers,partials,data) {
            return " readonly=\"readonly\" ";
        },
        "12":function(container,depth0,helpers,partials,data) {
            return " disabled=\"disabled\" ";
        },
        "14":function(container,depth0,helpers,partials,data) {
            var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

            return "<li component=\""
                + alias2(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
                + "\""
                + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.liClassName : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + "><label for=\""
                + alias2(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
                + "\">"
                + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.label : stack1), depth0)) != null ? stack1 : "")
                + "</label><div><input name=\""
                + alias2(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
                + "\" type=\"text\""
                + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.inputClassName : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.defaultValue : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.readonly : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.disabled : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + "/></div></li>";
        },
        "16":function(container,depth0,helpers,partials,data) {
            var stack1, alias1=container.lambda;

            return "<li component=\""
                + container.escapeExpression(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
                + "\" class=\"sn-select "
                + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.liClassName : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + "\"><label>"
                + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.label : stack1), depth0)) != null ? stack1 : "")
                + "</label>&nbsp;<div class=\"sn-select-analog\"><a class=\"sn-select-single\"><span>请选择</span><div><b></b></div></a></div></li>";
        },
        "17":function(container,depth0,helpers,partials,data) {
            var stack1;

            return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.liClassName : stack1), depth0));
        },
        "19":function(container,depth0,helpers,partials,data) {
            var stack1, alias1=container.lambda;

            return "<li component=\""
                + container.escapeExpression(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
                + "\" "
                + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.liClassName : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + "><label>"
                + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.label : stack1), depth0)) != null ? stack1 : "")
                + "</label><div class=\"has-formlayer\">    <input class=\"texts bg-tree\" type=\"text\" readonly=\"readonly\"></div></li>";
        },
        "21":function(container,depth0,helpers,partials,data) {
            var stack1, alias1=container.lambda;

            return "<li component=\""
                + container.escapeExpression(alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
                + "\" "
                + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.liClassName : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
                + "><label>"
                + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.label : stack1), depth0)) != null ? stack1 : "")
                + "</label><div>    <input class=\"bg-date\" type=\"text\" readonly=\"readonly\"/></div></li>";
        },
        "23":function(container,depth0,helpers,partials,data,blockParams) {
            var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

            return "<div class=\"sn-radios "
                + alias3(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"className","hash":{},"data":data,"blockParams":blockParams}) : helper)))
                + "\" component=\""
                + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.name : stack1), depth0))
                + "\">    <ul class=\"chk-list\">        "
                + ((stack1 = (helpers.blockOption || (depth0 && depth0.blockOption) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.items : stack1),(depth0 != null ? depth0.options : depth0),{"name":"blockOption","hash":{},"fn":container.program(24, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
                + "</ul></div>";
        },
        "24":function(container,depth0,helpers,partials,data,blockParams) {
            var stack1;

            return "        "
                + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},blockParams[0][0],{"name":"each","hash":{},"fn":container.program(25, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
        },
        "25":function(container,depth0,helpers,partials,data,blockParams) {
            var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

            return "        <li class=\""
                + alias4(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"className","hash":{},"data":data}) : helper)))
                + "\">            <div "
                + ((stack1 = (helpers.ifInDisabledValue || (depth0 && depth0.ifInDisabledValue) || alias2).call(alias1,blockParams[1][1],{"name":"ifInDisabledValue","hash":{},"fn":container.program(26, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
                + "            "
                + ((stack1 = (helpers.ifInDefaultValue || (depth0 && depth0.ifInDefaultValue) || alias2).call(alias1,depth0,blockParams[1][1],{"name":"ifInDefaultValue","hash":{},"fn":container.program(28, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
                + " >            <input type=\"checkbox\"                   "
                + ((stack1 = (helpers.ifInDisabledValue || (depth0 && depth0.ifInDisabledValue) || alias2).call(alias1,blockParams[1][1],{"name":"ifInDisabledValue","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
                + "            "
                + ((stack1 = (helpers.ifInDefaultValue || (depth0 && depth0.ifInDefaultValue) || alias2).call(alias1,depth0,blockParams[1][1],{"name":"ifInDefaultValue","hash":{},"fn":container.program(30, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
                + ">            <ins></ins></div><label>"
                + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"blockParams":blockParams}) : helper)))
                + "</label></li>";
        },
        "26":function(container,depth0,helpers,partials,data) {
            return " class=\"disabled\" ";
        },
        "28":function(container,depth0,helpers,partials,data) {
            return "class=\"checked\"";
        },
        "30":function(container,depth0,helpers,partials,data) {
            return " checked=\"checked\" ";
        },
        "32":function(container,depth0,helpers,partials,data) {
            return "<li>    <label></label>    <div>        组件加载失败请检查模板    </div></li>";
        },
        "compiler":[7,">= 4.0.0"],
        "main":function(container,depth0,helpers,partials,data,blockParams) {
            var stack1;

            return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.components : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
        },
        "useData":true,
        "useBlockParams":true})

});