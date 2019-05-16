define("text!../../select/select.tpl",[],function () { return '{{#if label}}\r\n<label>{{{label}}}</label>\r\n{{/if}}\r\n<div class="sn-select-container">\r\n    <select>\r\n    </select>\r\n    <div class="sn-select-analog">\r\n        <a class="sn-select-single">\r\n            <span></span>\r\n            <div><b></b></div>\r\n        </a>\r\n        <div class="sn-select-drop">\r\n          <ul >\r\n          </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n';});

define('select',['underscore','eventTarget','hdb','jquery',"text!../../select/select.tpl"],
    function (_,EventTarget,Hdb,$,tpl) {
        var objClass = function(options){
            this.arr = [];
            if(options.el && options.el instanceof jQuery){
                this.$el = options.el;
            }else if(options.el && (options.el.nodeType==1 || typeof (options.el) == 'string')){
                this.$el = $(options.el);
            }else{
                this.$el = $('<li></li>');
            }
            this.$el.addClass('sn-select');

            EventTarget.call(this);
            initialize.call(this, options);
            eventInit.call(this);
        }

        var initialize = function(options){
            var datas = options.datas && options.datas.slice(0);
            this.options = options;
            if(datas && typeof (datas) == "object" && Object.prototype.toString.call(datas) == "[object Array]"
                && ( datas.length > 0)){
                if(!options.value){
                    options.value = '';
                }
                datas =_.union([{bizCode:"",codeName:options.topOption?options.topOption:"请选择"}], datas);
                this.arr = datas;
                render.call(this, this.$el, options, datas);
                this.setValue(options.value);
                isDisabled.call(this);
                setTimeout(function () {
                    "function" == typeof options.dataReady && options.dataReady()
                }, 0)
            }else if(options && options.url && typeof (options.url) == 'string' && options.url.length > 0){
                var ajaxOptions = options.jquery;
                ajaxOptions = $.extend({
                    type:'post',
                    dataType:'json',
                    url:options.url,
                    data:{},
                    success:$.proxy(ajaxHandle, this),
                    error:function(err){
                        console.log('集成组件-下拉框 数据加载失败!');
                    }
                }, ajaxOptions);
                $.ajax(ajaxOptions);
            }else{
                console.log('集成组件-下拉框 数据加载失败!');
            }
        }

        var render = function($ele, options, result){
            var template = Hdb.compile(tpl);
            $ele.html(template(options));
            $ele.find('select').attr('name',options.name).addClass(options.className);
            $.each(result, $.proxy(function(i, item){
                var disable = item.disabled;
                $ele.find('select').append('<option value=' + item.bizCode + '>' + item.codeName + '</option>');
                $ele.find('ul').append('<li class="active-result">' + item.codeName + '</li>');
                if(disable){
                    $('option:last',$ele).prop('disabled',true);
                    $('li:last',$ele).addClass('disabled-result');
                }
            }, this));
            this["$select"] = $('.sn-select-container>select', $ele);
            this["$analog"] = $('.sn-select-container>.sn-select-analog', $ele);
            this["$ul"] = $('.sn-select-container>.sn-select-analog>.sn-select-drop>ul', $ele);
        };

        var isDisabled = function(){
            var isDisable = this.options.disabled;
            if(isDisable){
                this.$select.prop("disabled",isDisable);
                this.$analog.addClass('sn-select-disabled');
            }
        }

        var ajaxHandle = function(result){
            if (result.returnCode == '0'){
                var options = this.options;
                var datas = result.beans;
                if(!options.value){
                    options.value = '';
                }
                datas = _.union([{bizCode:"",codeName:options.topOption?options.topOption:"请选择"}], datas);
                this.arr = datas;
                $.extend(result, options);
                render.call(this,this.$el, options, datas);
                this.setValue(result.value);
                isDisabled.call(this);
                // this.trigger("success");
                setTimeout(function () {
                    "function" == typeof options.dataReady && options.dataReady()
                }, 0)
            }else{
                // this.trigger("fail");
            }
        }

        var eventInit = function(){
            this.$el.on('click','.sn-select-container>.sn-select-analog',$.proxy(function(e){
                showDrop.call(this, e);
                this.trigger('showDrop', e);
            }, this));
            this.$el.on('click','.sn-select-container>.sn-select-analog>.sn-select-drop>ul>li',$.proxy(function(e){
                liClick.call(this, e);
                this.trigger('liClick', e);
            }, this));
            $(document).on('click',function(e){
                var $analog = $('.sn-select-drop-active').closest('.sn-select-analog');
                if($('.sn-select-drop-active',$analog).length != 0){
                    spaceClose(e, $analog);
                }
            });
        }

        var showDrop = function(e){
            e.stopPropagation();
            var $drop = $('.sn-select .sn-select-drop-active');
            if($drop.length != 0){
                var $con = $drop.closest('.sn-select');
                if(!$con.is(this.$el)){
                    $('.sn-select-drop', $con).removeClass('sn-select-drop-active');
                    $('.sn-select-analog', $con).removeClass('sn-select-analog-active');
                }
            }
            if(!this.$select.prop('disabled')){
                $('.sn-select-drop',this.$analog).addClass('sn-select-drop-active');
                this.$analog.addClass('sn-select-analog-active');
            }
        }

        var liClick = function(e){
            e.stopPropagation();
            var $src = $(e.target || e.currentTarget);
            var $li = $src;
            if($li.hasClass('disabled-result')){
                return;
            }else{
                if($li.hasClass('result-selected')){
                    this.$analog.removeClass('sn-select-analog-active');
                    $('.sn-select-drop', this.$analog).removeClass('sn-select-drop-active');
                }else{
                    var index = $li.index();
                    $('.result-selected', this.$ul).removeClass('result-selected');
                    $('.sn-select-single>span', this.$analog).html($li.html());
                    var value = $('option:eq(' + index + ')', this.$select).val();
                    this.$select.val(value);
                    $li.addClass('result-selected');
                    this.$analog.removeClass('sn-select-analog-active');
                    $('.sn-select-drop',this.$analog).removeClass('sn-select-drop-active');
                    this.trigger('change', e, this.getSelected());
                }
            }
        }

        var spaceClose = function(e,$analog){
            var $target = $(e.target || e.currentTarget);
            var $el = $analog.closest('.sn-select');
            if($target.closest($el).length == 0){
                $('.sn-select-drop', $analog).removeClass('sn-select-drop-active');
                $analog.removeClass('sn-select-analog-active');
            }
        }

        var getOption = function(value){
            var $option;
            if(value && value != ''){
                if(typeof value == 'string'){
                    $option = this.$select.find("option[value="+value+"]");
                }else if(typeof value == 'number'){
                    $option = this.$select.find("option:eq("+value+")");
                }else if(Object.prototype.toString.apply(value) === "[object Array]"){
                    var pro = value[0];
                    var val = value[1];
                    $.each(this.arr, $.proxy(function(i, item){
                        if(item[pro] == val){
                            $option = this.$select.find("option[value=" + item.value + "]");
                        }
                    }, this));
                }
            }else{
                $option = this.$select.find("option:eq(0)");
            }
            return $option;
        }
        var notReadyFunc = function(){
            if(this.$select && this.$analog && this.$ul){
                return false;
            }else{
                return true;
            }
        }

        $.extend(objClass.prototype, {
            // 设置下拉框选中项
            setValue : function(value, e){
                if(notReadyFunc.call(this)){
                    console.log("select未初始化完毕，请勿调用组件setValue方法,错误参考↓");
                    console.log(this);
                    return;
                }
                if(typeof(value) == 'undefined'){
                    return;
                }else{
                    var $option = getOption.call(this,value);
                    var text = $option.html();
                    var selectValue = this.$select.val();
                    if($option && $option.length != 0){
                        if(text !== $('.sn-select-single>span', this.$analog).html()){
                            var index = $option.index();
                            $('.sn-result-selected', this.$ul).removeClass('sn-result-selected');
                            $('li:eq('+index+')', this.$ul).addClass('sn-result-selected');
                            $('.result-selected', this.$ul).removeClass('result-selected');//组件通过代码设置默认值时，须将之前选中项的标记类去掉
                            this.$select.val($option.val());
                            $('.sn-select-single>span', this.$analog).html(text);
                            if(selectValue !== value){
                                this.trigger('change',e,this.getSelected());
                            }
                        }
                    }
                }
            },
            // 获取下拉框的值
            getSelected : function(value){
                var ind = $("option:selected", this.$select).prop('index');
                var obj = this.arr[ind];
                if(value){
                    return obj[value];
                }else{
                    return obj;
                }
            },
            // 启用下拉框
            enable:function(value){
                if(typeof(value) != 'undefined'){
                    var $option = getOption.call(this,value);
                    if($option.prop('disabled')){
                        var index = $option.index();
                        $option.prop('disabled', false);
                        $('li:eq(' + index + ')', this.$ul).removeClass('disabled-result');
                    }
                }else{
                    this.options.disabled = false;
                    this.$select.prop("disabled",false);
                    this.$analog.removeClass('sn-select-disabled');
                }
            },
            //禁用下拉框
            disabled:function(value){
                if(typeof(value) != 'undefined'){
                    var $option = getOption.call(this,value);
                    if(!$option.prop('disabled')){
                        var index = $option.index();
                        $option.prop('disabled',true);
                        $('li:eq(' + index + ')',this.$ul).addClass('disabled-result');
                    }
                }else{
                    this.options.disabled = true;
                    this.$select.prop("disabled",true);
                    this.$analog.addClass('sn-select-disabled');
                }
            },
            //重新加载
            reload:function(datas){
                this.options.datas = datas;
                initialize.call(this, this.options);
            }
        }, EventTarget.prototype);

        return objClass;

    });


(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
('/*! Rewrite the Chosen’s css, By Tonytian, Kevin903@163.com */\r\n.sn-select > .sn-select-container{font-size: 13px; display: inline-block;}\r\n.sn-select > .sn-select-container *{box-sizing: border-box;}\r\n.sn-select > .sn-select-container > select{display: none;}\r\n.sn-select .sn-select-analog{position: relative; width: 100%; user-select: none; margin:0 0 0 0;}\r\n/**\r\n.sn-select .sn-select-analog{position: relative; width: 100%; user-select: none;}\r\n**/\r\n.sn-select .sn-select-single{box-sizing: border-box; position: relative; display: block; overflow: hidden; padding: 0 0 0 6px; height: 30px; border: 1px solid #e5e6e7; color: #444; text-decoration: none; white-space: nowrap; line-height: 30px; cursor: pointer;}\r\n.sn-select .sn-select-single span{display: block; overflow: hidden; margin-right: 26px; text-overflow: ellipsis; white-space: nowrap; line-height: 30px;}\r\n.sn-select .sn-select-single div{position: absolute; top: 0; right: 0; display: block; width: 24px; height: 100%;}\r\n.sn-select .sn-select-single div b{display: block; width: 100%; height: 100%; background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkVBMUM5N0QwMDgwMTFFNzlDQzc5ODQ0MEVEQzY1QTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkVBMUM5N0UwMDgwMTFFNzlDQzc5ODQ0MEVEQzY1QTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RUExQzk3QjAwODAxMUU3OUNDNzk4NDQwRURDNjVBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2RUExQzk3QzAwODAxMUU3OUNDNzk4NDQwRURDNjVBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkNgXWoAAACuSURBVEjHY/j//z/DQGKGUQcMuAMqJswxBOLdQCwAxAxYMEh8D0gdMQZi0S8HxPuhNIoczAF7gfg/EJ8GYn40RSD+Kaj8XjIcIAPEd6D670D5GA4QBeIrUEXHkRwBoo9BxUHyoiQ6QAqIb0H1f4PSt6DiKA4AYXEgvg5VdASIJaD0f6i4OEwDkQ4g2jySXUyEA0gKUZLjjAgHkJSmSE61RDiApFw1WhCNOmDAHQAAWBlggEXNrGYAAAAASUVORK5CYII=\') no-repeat 6px 6px;}\r\n.sn-select .sn-select-with-drop .sn-select-single div b{background-position: -14px 6px;}\r\n.sn-select .sn-select-drop{position: absolute; top: 33px; left: 0; z-index: 1010; background: #fff; width: 100%; border: 1px solid #18a689; display: none;}\r\n.sn-select .sn-select-drop ul{color: #444; position: relative; overflow-x: hidden; overflow-y: auto; margin: 0; padding: 0; max-height: 240px; -webkit-overflow-scrolling: touch;}\r\n.sn-select .sn-select-drop ul li{display: none; margin: 0; padding: 5px 6px; list-style: none; line-height: 15px; word-wrap: break-word; -webkit-touch-callout: none;}\r\n.sn-select .sn-select-drop ul li.active-result{display: list-item; cursor: pointer;}\r\n.sn-select .sn-select-drop ul li.highlighted, .sn-select .sn-select-drop ul li:hover{background-color: #18a689; color: #333;}\r\n.sn-select .sn-select-drop ul li.disabled-result{display: list-item; color: #ccc; cursor: not-allowed;}\r\n.sn-select .sn-select-drop ul li.disabled-result:hover {background: transparent !important;}\r\n.sn-select .sn-select-disabled > .sn-select-drop {display: none;}\r\n.sn-select .sn-select-disabled .sn-select-single {box-shadow: none; border-color: #E6E6E6; background: #F6F6F6; color: #CCC; cursor: not-allowed;}\r\n.sn-select .sn-select-disabled .sn-select-single div b{filter: alpha(opacity=30); opacity: 0.3;}\r\n@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx){.sn-select .sn-select-single div b{background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTE2NTY5RUMwMDgxMTFFNzlDQzc5ODQ0MEVEQzY1QTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTE2NTY5RUQwMDgxMTFFNzlDQzc5ODQ0MEVEQzY1QTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RUExQzk3RjAwODAxMUU3OUNDNzk4NDQwRURDNjVBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2RUExQzk4MDAwODAxMUU3OUNDNzk4NDQwRURDNjVBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvJi5y0AAAHMSURBVGje7ZfPSsNAEMZzqr6OKCJKoRfBe6Ggl0IPnnooWEEvPoO9J2/QUw++lFCC0F4sid8ms8k4ibcZKDiHj/2T3ZndX2Y2m6Qsy+Q/K3EADsABOAAH4AAcwFFr+Z5Wel5lpLpe97X9aL+Rfj2Lc7mdUDYA6MEJHmxQ3smBXMyZdJ7Q3A3ap9GBFoB285lYQ9N+gUrSqxzT3QMDgI4B9BEmY8Aeug0DJAi5eQEBc7I9LSDYGmgB4G9dAiA91X7TsP6qRHvZBfd3BKyFgR00kgY4PWF0hPqOAJZUrrUjoC8y4X/B/UZReyHThotHwBj6FgbChoYyjHqADPnmyXGwNbaIAJGKc6gQ4DmMAvV5T8RIAFXHBDrESCBjXyhv+iZT/ZrGcOcHaBIdaAHoScFHlIV4aZ9BIhUKGts5RHkExM6HAEHQzFG/6h6G6SX6c74AAnjPQ0z7ECT/M/gv2CaDttBZEPq3bRSkMRJmInUkgEZTDoGUo33BFnJOYMTm06nMMb0UsFmfOWHlM0A9Qs1zTAeA3RllfsoqRYDZV8r8O6t0CJrdU8xvWkoRYHZTNb9rK/4MmfyrmP9t+e+wA3AADsABOAAH4AAcwJHqB/BbfOZipBTZAAAAAElFTkSuQmCC\') !important; background-position: 6px 6px; background-size: 32px 16px !important; background-repeat: no-repeat !important;}}\r\n/* Add animation */\r\n.sn-select .sn-select-single div{-webkit-transition: -webkit-transform 0.2s ease-out; -ms-transition: -ms-transform 0.2s ease-out; transition: transform 0.2s ease-out;}\r\n.sn-select .sn-select-analog-active .sn-select-single div{-webkit-transform: rotateZ(180deg); -ms-transform: rotateZ(180deg); transform: rotateZ(180deg);}\r\n.sn-select .sn-select-drop-active{display: block; animation: selectdown 0.2s; -webkit-animation: selectdown 0.2s;}\r\n@-webkit-keyframes selectdown{from{opacity: 0; -webkit-transform: translate(0, -30px); transform: translate(0, -30px);} to{opacity: 1; -webkit-transform: translate(0, 0); transform: none;}}\r\n@keyframes selectdown{from{opacity: 0; -webkit-transform: translate(0, -30px); transform: translate(0, -30px);} to{opacity: 1; -webkit-transform: translate(0, 0); transform: none;}}');
