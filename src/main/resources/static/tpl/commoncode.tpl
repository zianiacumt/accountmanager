<div class="t-columns-4">
    <form>
        <ul class="t-columns-group">
            <li>
                <label for="codeTypeName">码表类型名称</label>
                <div><input class="class_input" type="text" id="codeTypeName" name="codeTypeName"/></div>
            </li>
            <li>
                <label for="codeName">名称</label>
                <div><input class="class_input" type="text" id="codeName" name="codeName"/></div>
            </li>
            <li>
                <label for="validFlag">是否有效</label>
                <div><input class="class_input" type="text" id="validFlag" name="validFlag"/></div>
            </li>
            <li>
                <label for="createStartTime">创建开始时间</label>
                <div><input class="class_input" type="text" id="createStartTime" name="createStartTime" readOnly="readOnly"/></div>
            </li>
            <li>
                <label for="createEndTime">创建结束时间</label>
                <div><input class="class_input" type="text" id="createEndTime" name="createEndTime" readOnly="readOnly"/></div>
            </li>
            <li>
                <label for="createStartTime">修改开始时间</label>
                <div><input class="class_input" type="text" id="modifyStartTime" name="modifyStartTime" readOnly="readOnly"/></div>
            </li>
            <li>
                <label for="createEndTime">修改结束时间</label>
                <div><input class="class_input" type="text" id="modifyEndTime" name="modifyEndTime" readOnly="readOnly"/></div>
            </li>
            <li style="float: right;">
                <label></label>
                <div>
                    <a class="layui-btn layui-btn-sm" id="serach">查询</a>
                    <a class="layui-btn layui-btn-sm" id="reset">重置</a>
                </div>
            </li>
        </ul>
    </form>
</div>
<table id="code_table" lay-filter="code_table"></table>