require(['select', 'hdbHelper','text!../../tpl/selectdemo.tpl'], function(Select, hdb, tpl){

    var template = hdb.compile(tpl);
    $("#main").html(template);
    var selectConfig = {
        label: "性别",
        el:"#selectdemo",
        url:"/quryCode?codeTypeCd=COMMON_CODE@SEX",
        name:"sex",
        value:"1"
    }

    this.select = new Select(selectConfig);

    console.log(this.select);

});