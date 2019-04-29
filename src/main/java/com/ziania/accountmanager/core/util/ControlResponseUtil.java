package com.ziania.accountmanager.core.util;

import com.alibaba.druid.support.json.JSONUtils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class ControlResponseUtil {

    public static void response(HttpServletResponse response, Map<String,Object> result) {
        try {
            response.setContentType("text/json charset=utf-8");
            String str = JSONUtils.toJSONString(result);
            response.getWriter().print(str);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
