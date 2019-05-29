<div class="layui-layout layui-layout-admin">
    <!-- header -->
    <div class="layui-header" id="header">
    </div>

    <!-- side -->
    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <ul class="layui-nav layui-nav-tree">
                {{#each menus}}
                <li class="layui-nav-item">
                    <a href="javascript:void(0);">{{menuName}}</a>
                    {{#if subMenus}}
                    <dl class="layui-nav-child">
                        {{#each subMenus}}
                        <dd><a href="javascript:void(0);" id="{{menuId}}">{{menuName}}</a></dd>
                        {{/each}}
                    </dl>
                    {{/if}}
                </li>
                {{/each}}
            </ul>
        </div>
    </div>

    <!-- iframe -->
    <div style="position: fixed; top: 60px; left: 200px; right: 0px;bottom: 0px">
        <iframe style="border: 0px;" src="https://www.baidu.com" width="100%" id="domain"></iframe>
    </div>
</div>