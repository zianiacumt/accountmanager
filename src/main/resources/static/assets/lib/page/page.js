define(['backbone','underscore',"hdbHelper", "page/page.tpl"], function(Backbone,_,hdb, ulTpl) {

    //注册组件
    hdb.registerHelper("if_component", function(context, options) {
        if (context == options.hash.compare) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    var mustOptions = ['components', 'tpl'];
    var optionalOptions = ['initializeEvents', 'validation'];
    var eventsHandle = "eventsHandle";
    var ITEM_COMPONENT = "component";
    var ITEM_OPTIONS = "options";
    var ITEM_LABELS = "labels"
    var ITEM_KEY = "key";
    var ITEM_LABEL = "label";
    var ITEM_NAME = "name";
    var ITEM_VALUE = "value";
    var COMPONENT_INPUT = "input";
    var COMPONENT_TEXTAREA = "textarea";
    var COMPONENT_SELECT = "select";
    var COMPONENT_DATE = "date";

    var Page = Backbone.View.extend({

        //初始化
        initialize: function (options) {
            var miss = false;
            _.each(mustOptions, function (option) {
                if (_.isEmpty(options[option])) {
                    miss = true;
                }
            });
            if (miss) {
                console.log("must option missing");
                throw new Error("must option missing");
            }
            // _.extend(this.events, {
            //     "change input": "valueChange",
            //     "change textarea": "valueChange"
            // });

            this._templateLoad = false;
            this.componentsLength = 0;
            _.extend(this, _.pick(options, _.union(mustOptions, optionalOptions)));
            _.extend(this, options[eventsHandle]);

            this.validation = this.validation || {};
            this[ITEM_LABELS] = {};

            //组件预处理
            this.configComponents();

            var PAGE_MODEL = Backbone.Model.extend({
                validation: this.validation || {},
                labels: this.labels
            });
            var NAME_MODEL = Backbone.Model.extend({});
            this.model = new PAGE_MODEL();
            this.nameModel = new NAME_MODEL();

            this.configTemplates();

            this._componentsReady = false;
            this._templateReady = false;
            this.componentAllReady = "0";
            this._component = {};
            this._items = {};
            this._errorItems = {};
            this.validateType = {};
            this._selectReadyCount = 0;
            this._selectCount = 0;
            this._readyComponent = 0;
            this._renderComponent = 0;
            this._templateRelation = {};
            this._formRelation = {};

            require([options.tpl], _.bind(this.templateLoadComplete, this));

            //初始化组件
            this.initializeComponents();
        },

        //components预处理
        configComponents: function () {
            var _this = this;
            if (_.isArray(_this.components)) {
                _this.componentsLength = _this.components.length;
                _.each(_this.components, function (component) {
                    _this.configComponent(component);
                    _this.configLabel(component);
                    _this.configLabelInfo(component);
                });
            } else if (_.isObject(_this.components)) {
                _.each(_this.components, function (components, template) {
                    if (!_.isArray(components)) {
                        return;
                    }
                    _this.componentsLength += components.length;
                    _.each(components, function (component) {
                        _this.configComponent(component);
                        _this.configLabel(component, template);
                        _this.configLabelInfo(component, template);
                    });
                });
            } else {
                console.log("components must be Array or JSON");
                throw new Error("components must be Array or JSON");
            }
        },

        //component预处理
        configComponent: function (component) {
            if (_.has(component, ITEM_OPTIONS) && _.has(component, ITEM_KEY)) {
                component[ITEM_OPTIONS] = _.extend({
                    name: component[ITEM_KEY],
                    label: component[ITEM_OPTIONS][ITEM_LABEL]
                }, component[ITEM_OPTIONS]);
            }
            if (component[ITEM_COMPONENT] == COMPONENT_INPUT || component[ITEM_COMPONENT] == COMPONENT_TEXTAREA) {
                component[ITEM_OPTIONS] = _.extend({
                    name: component[ITEM_KEY],
                    label: component[ITEM_LABEL]
                }, component[ITEM_OPTIONS]);
            }
        },

        //label预处理
        configLabel: function (component, template) {
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
            this[ITEM_LABELS][key] = label;
        },

        //页面展示的label预处理
        configLabelInfo: function (component, template) {
            var label;
            var labelHTML;
            if (_.has(component, ITEM_OPTIONS) && _.has(component[ITEM_OPTIONS], ITEM_LABEL)) {
                label = component[ITEM_OPTIONS][ITEM_LABEL];
            }
            if (_.isString(label)) {
                var componentKey = component[ITEM_KEY];
                var required = false;
                var key = componentKey;
                if (!_.isEmpty(this.validation)) {
                    if (_.isString(template)) {
                        key = template + "." + componentKey;
                    }
                    if (_.has(this.validation, key)) {
                        required = this.validation[key]["required"] || false;//是否必填
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

        //初始化组件
        initializeComponents: function () {
            var _this = this;
            if (_.isArray(_this.components)) {
                _.each(_this.components, function (component, index) {
                    _this.initializeComponent(component, index, undefined);
                });
            } else if (_.isObject(_this.components)) {
                _.each(_this.components, function (components, template) {
                    if (!_.isArray(components)) {
                        return;
                    }
                    _.each(components, function (component, index) {
                        _this.initializeComponent(component, template + "_" + index, template);
                    });
                });
            } else {
                console.log("components must be Array or JSON");
                throw new Error("components must be Array or JSON");
            }

        },

        initializeComponent: function (item, index, template) {
            var _this = this;
            if (_.has(item, ITEM_COMPONENT)) {
                var componentName = item[ITEM_COMPONENT];
                var componentKey = (_.has(item, ITEM_KEY)) ? item[ITEM_KEY] : index;
                this.validateType[componentKey] = componentName;
                if (_.isEmpty(componentName) || _.isEmpty(componentKey)) {
                    console.log("component and key should not be empty");
                    throw new Error("component and key should not be empty");
                }
                if (_.isEqual(componentName, COMPONENT_INPUT) || _.isEqual(componentName, COMPONENT_TEXTAREA)) {
                    _this._readyComponent++;
                    _this._renderComponent++;
                    _this._templateRelation[componentKey] = template;
                    _.delay(_.bind(function () {
                        var componentEL = this.$el.find("[component=" + componentKey + "]");
                        var formEl = componentEL.parents("form");
                        if (formEl.length > 0) {
                            var formId = formEl.attr("id");
                            if (_.isString(formId)) {
                                this._completeFormRelation(formId, componentKey);
                            }
                        }
                    }, _this), 1000);
                    return;
                }
                if (_.isEqual(componentName, COMPONENT_SELECT)) {
                    this._selectCount++;
                    item.options.topValue = "";
                    item.options.dataReady = function () {
                        _this.componentRenderComplete();
                    }
                }
                var componentOptions = (_.has(item, ITEM_OPTIONS)) ? item[ITEM_OPTIONS] : {};
                if (_.has(_this._component, componentName)) {
                    var componentImpl = _this._component[componentName];
                    _this.componentLoadReady(componentImpl, componentKey, componentOptions,componentName);
                } else {
                    require([componentName], _.bind(function (componentKey, componentOptions, component) {
                        _this._component[componentName] = component;
                        _this.componentLoadReady(component, componentKey, componentOptions,componentName);
                    }, _this, componentKey, componentOptions));
                }
            }
        },

        componentLoadReady: function (componentImpl, componentKey, componentOptions,componentName) {
            var pageContext = this;
            this._readyComponent++;
            if (!_.isFunction(componentImpl) || !_.isString(componentKey) || !_.isObject(componentOptions)) {
                this.componentLoadReadyCheck();
                return;
            }
            if(_.isEqual(COMPONENT_DATE,componentName)){
                componentOptions.clearFunc = function () {
                    pageContext.getComponent(componentKey).trigger("change",{},"");
                };
            }
            this._items[componentKey] = new componentImpl(componentOptions);

            if (_.isString(componentOptions[ITEM_VALUE])) {
                var value = componentOptions[ITEM_VALUE];
                var key = componentKey;
                if (_.has(this._templateRelation, componentKey)) {
                    var template = this._templateRelation[componentKey];
                    if (_.isString(template)) {
                        key = template + "." + componentKey;
                    }
                }
                var json = {};
                json[key] = value;
                this.model.set(json);
            }
            this.componentLoadReadyCheck();
        },

        componentLoadReadyCheck: function () {
            if (this._readyComponent == this.componentsLength) {
                this.componentComplete();
            }
        },

        componentComplete: function () {
            var _this = this;
            if (_.isArray(_this.components)) {
                _.each(_this.components, function (config, index) {
                    _this.componentRenderWithDelay(config, index, undefined);
                });
            } else if (_.isObject(_this.components)) {
                _.each(_this.components, function (components, template) {
                    if (!_.isArray(components)) {
                        return;
                    }
                    _.each(components, function (config, index) {
                        _this.componentRenderWithDelay(config, template + "_" + index, template);
                    });
                });
            } else {
                console.log("components must be Array or JSON");
                throw new Error("components must be Array or JSON");
            }
            this._ensureElement();
            // _this.trigger(EVENT_LOAD_COMPLETE, _this);
        },

        componentRenderWithDelay: function (config, index, template) {
            if (!this._templateLoad) {
                this.doComponentRenderDelay(config, index, template);
            } else {
                this.componentRender(config, index, template);
            }
        },

        doComponentRenderDelay: function (config, index, template) {
            if (!this._templateLoad) {
                _.delay(_.bind(this.doComponentRenderDelay, this, config, index, template), 20);
            } else {
                this.componentRender(config, index, template);
            }
        },

        componentRender: function (config, index, template) {
            var componentName = config[ITEM_COMPONENT];
            var componentKey = (_.has(config, ITEM_KEY)) ? config[ITEM_KEY] : index;
            if (_.isEqual(componentName, COMPONENT_INPUT) || _.isEqual(componentName, COMPONENT_TEXTAREA)) {
                if (_.isString(template)) {
                    (template + "." + componentKey);
                }
                return;
            }
            var component = this._items[componentKey];
            this._templateRelation[componentKey] = template;
            if (_.isEqual(componentName, COMPONENT_SELECT) || _.isEqual(componentName, "selectTree")
                || _.isEqual(componentName, COMPONENT_SELECT)|| _.isEqual(componentName, "radios")) {
                if (_.isFunction(component["on"])) {
                    // component.on("change", _.bind(this._valueChange, this, componentKey, template));
                }
            }
            var componentEL = this.$el.find("[component=" + componentKey + "]");
            var formEl = componentEL.parents("form");
            if (formEl.length > 0) {
                var formId = formEl.attr("id");
                if (_.isString(formId)) {
                    this._completeFormRelation(formId, componentKey);
                }
            }
            componentEL.replaceWith(component.$el);
            this._renderComponent++;
            this.componentRenderCheck();
        },

        componentRenderCheck: function () {
            if (this._renderComponent == this.componentsLength) {
                this.componentAllReady = "1";
                this.componentRenderComplete();
            }
        },

        //建立与form的关联关系
        _completeFormRelation: function (formId, componentKey) {
            if (!_.has(this._formRelation, formId)) {
                this._formRelation[formId] = [];
            }
            this._formRelation[formId].push(componentKey);
        },

        componentRenderComplete: function () {
            this._selectReadyCount++;
            if(this._selectCount == 0 || this._selectCount <= this._selectReadyCount){
                if(this.componentAllReady == "0"){
                    _.delay(_.bind(this.componentRenderComplete, this), 20);
                }else if(this.componentAllReady == "1"){
                    this.componentAllReady = "2";
                    this._ensureElement();
                    // this.trigger(SELECT_LOAD_COMPLETE, this);
                }
            }
        },

        templateLoadComplete: function (tpl) {
            this.template = hdb.compile(tpl);
            var html = this.template(this.templateHTML);
            this.$el.html(html);
            this._templateLoad = true;
            // this.trigger(EVENT_TEMPLATE_LOAD_COMPLETE, this);
            this._ensureElement();//重要
            this.render();
        },

        configTemplates: function () {
            var _this = this;
            _this.templateHTML = {};
            if (_.isArray(_this.components)) {
                _this.templateHTML["template"] = _this.configTemplate(_this.components);
            } else if (_.isObject(_this.components)) {
                _.each(_this.components, function (components, template) {
                    if(typeof  components == "string" || typeof  components == "number"){
                        _this.templateHTML[template] = components;
                    }else{
                        _this.templateHTML[template] = _this.configTemplate(components);
                    }
                });
            } else {
                console.log("components must be Array or JSON");
                throw new Error("components must be Array or JSON");
            }
        },

        configTemplate: function (components) {
            var templateHTML = ulTpl({
                components: components
            });
            return templateHTML;
        },
        //获取组件
        getComponent: function() {

        },

        //是否有某个组件
        hasComponent: function() {

        },

        //获取值
        val: function(key) {
            if (_.isString(key)) {
                console.log("key must be string");
                throw new Error("key must be string");
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if (_.isArray(args) && args.length > 0) {
                return this._setValue.apply(this, arguments);
            } else {
                return this._getValue.apply(this, arguments);
            }
        },

        _setValue: function(key) {
            if (_.isEmpty(key)) {
                console.log("key must not be empty");
                throw new Error("key must not be empty");
            }
            var agrs = Array.prototype.slice.call(arguments, 1);
            if (_.has(this._items, key)) {

            } else {
                return this._jqVal(key, agrs);
            }
        },

        _getValue: function() {

        },

        _jqVal: function() {

        },

        //验证参数
        doValidate: function() {
            var _this = this;
            var validate = true;
            if (!_.isEmpty(_this.validation) && _.isObject(_this.validation)) {
                var errorMeaasge = "";
                _.each(_this.validation, function(value, key) {
                    var eleKey = key.split(".")[1];
                    var $ele = $("[name=" + eleKey + "]");
                    if (_.isObject(value) && _.has(value, "required") && value.required == true) {//需要检验
                        if (_.isEmpty(_this.val(eleKey))) {//获取值
                            errorMeaasge +=  value.msg + "。<br/>";
                            if (_.isEqual(_this.validateType[eleKey], COMPONENT_INPUT) || _.isEqual(_this.validateType[eleKey], COMPONENT_TEXTAREA)) {
                                $ele.addClass("validate-error");
                            } else if (_.isEqual(_this.validateType[eleKey], COMPONENT_SELECT)) {
                                $ele.parent().find(".sn-select-analog").addClass("validate-error");
                            }
                            _.delay(function() {
                                $(".validate-error").removeClass("validate-error");
                            }, 3000);
                            validate = false;
                        }
                    }
                });
                alert(errorMeaasge);
            }
            return validate;
        }

    });

    return Page;
});