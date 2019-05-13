define(['backbone','underscore',"hdbHelper", "page/page.tpl"], function(Backbone,_,hdb, ultpl) {

    //注册组件
    hdb.registerHelper("if_component", function(context, options) {
        if (context == options.hash.compare) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    var mustOptions = ["components","tpl","el"];
    var ITEM_COMPONENT = "component";
    var ITEM_OPTIONS = "options";
    var ITEM_KEY = "key";
    var ITEM_LABEL = "label";
    var ITEM_NAME = "name";
    var LABELS = "labels"

    var Page = Backbone.View.extend({

        //初始化
        initialize: function(options) {
            var miss = false;
            _.each(mustOptions, function(option) {
                if (_.isEmpty(options[option])) {
                    miss = true;
                }
            });
            if (miss) {
                throw new Error("some must options missing");
            }
            this.$el = options.el;
            this.components = options.components;
            this.validateConfig = options.validateConfig || {};
            this[LABELS] = {};
            this.componentLength = 0;
            this.configComponents();
            this.configTemplates();
            require([options.tpl], _.bind(this.templateLoadComplete, this));
        },

        configComponents: function() {
            var _this = this;
            if (_.isArray(_this.components)) {
                _this.componentLength = _this.components.length;
                _.each(_this.components, function(component) {
                    _this.configComponent(component);
                    _this.configLabel(component);
                    _this.configLabelInfo(component);
                });
                _this.configComponent
            } else if (_.isObject(_this.components)) {
                _.each(_this.components, function(components, template) {
                    if (!_.isArray(components)) {
                        return;
                    }
                    _.each(components, function(component) {
                        _this.configComponent(component);
                        _this.configLabel(component, template);
                        _this.configLabelInfo(component, template);
                    });
                });
            }
        },

        configComponent: function(component) {
            if (_.has(component, ITEM_OPTIONS) && _.has(component, ITEM_KEY)) {
                component[ITEM_OPTIONS] = _.extend({
                    name: component[ITEM_KEY],
                    label: component[ITEM_OPTIONS][ITEM_LABEL],
                }, component[ITEM_OPTIONS]);
            }
            if (component[ITEM_COMPONENT] == "input" || component[ITEM_COMPONENT] == "textarea") {
                component[ITEM_OPTIONS] = _.extend({
                    name: component[ITEM_KEY],
                    label: component[ITEM_LABEL],
                }, component[ITEM_OPTIONS]);
            }
        },

        configLabel: function(component, template) {
            if (!_.has(component, ITEM_KEY)) {
                return;
            }
            var key = component[ITEM_KEY];
            var label;
            if (_.isString(template)) {
                key = template + "." + key;
            }
            if (_.has(component, ITEM_OPTIONS)) {
                label = component[ITEM_OPTIONS][ITEM_LABEL];
            }
            this[LABELS][key] = label;
        },

        configLabelInfo: function(component, template) {
            var label;
            var labelHTML;
            if (_.has(component, ITEM_OPTIONS) && _.has(component[ITEM_OPTIONS], ITEM_LABEL)) {
                label = component[ITEM_OPTIONS][ITEM_LABEL];
            }
            if (_.isString(label)) {
                var key = component[ITEM_KEY];
                var required = false;
                if (!_.isEmpty(this.validateConfig)) {
                    if (_.isString(template)) {
                        key = template + "." + key;
                    }
                    if (_.has(this.validateConfig, key)) {
                        required = this.validateConfig[key]["required"] || false;
                    }
                }
                if (required) {
                    labelHTML = "<span style='color: red'>*</span>" +　label;
                } else {
                    labelHTML = label;
                }
                component[ITEM_OPTIONS][ITEM_LABEL] = labelHTML;
            }
        },

        configTemplates: function() {
            var _this = this;
            _this.templateHTML = {};
            if (_.isArray(_this.components)) {
                _this.templateHTML["template"] = _this.configTemplate(_this.components);
            } else if (_.isObject(_this.components)) {
                _.each(_this.components, function(components, template) {
                    if (typeof components== "string" || typeof components == "number") {
                        _this.templateHTML[template] = components;
                    } else {
                        _this.templateHTML[template] = _this.configTemplate(components);
                    }
                });
            } else {
                throw new Error("components must be array or json");
            }
        },

        configTemplate: function(components) {
            return ultpl({
                components: components
            });
        },

        templateLoadComplete: function(tpl) {
            this.template = hdb.compile(tpl);
            var html = this.template(this.templateHTML);
            this.$el.html(html);
            this.render();
        }

    });

    return Page;
});