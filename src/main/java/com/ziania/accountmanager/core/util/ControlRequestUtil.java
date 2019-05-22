package com.ziania.accountmanager.core.util;

import com.ziania.accountmanager.core.xml.Control;
import com.ziania.accountmanager.core.xml.Parameter;
import com.ziania.accountmanager.core.xml.Request;
import com.ziania.accountmanager.exception.CommonException;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ControlRequestUtil {

    private static final Logger Logger = LoggerFactory.getLogger(ControlRequestUtil.class);

    private static Map<String, Request> requestMap = new HashMap<>();

    /**
     * 获取匹配的request
     * @param path
     * @return
     * @throws CommonException
     */
    public static Request getRequest(String path) throws CommonException {
        Request request = requestMap.get(path);
        if (request == null) {
            Control control = ControlFactory.getControl();
            if (control != null) {
                List<Request> requests = control.getRequests();
                if (CollectionUtils.isNotEmpty(requests)) {
                    for (Request temp : requests) {
                        if (StringUtils.equals(path, temp.getPath())) {
                            request = temp;
                            requestMap.put(path, temp);
                            break;
                        }
                    }
                }
            }
        }
        if (request == null) {
            Logger.error("根据{}获取request失败", path);
            throw new CommonException("根据" + path + " 获取request失败");
        } else {
            return request;
        }
    }

    /**
     * 处理请求参数
     * @param servletrequest
     * @return
     * @throws CommonException
     */
    public static Map<String, Object> createReqParams (HttpServletRequest servletrequest) throws CommonException {
        String path = servletrequest.getRequestURI();
        Logger.info("请求url:{}", path);
        Request request = ControlRequestUtil.getRequest(path);
        Map<String, Object> returnParams = new HashMap<>();
        if (request != null) {
            List <Parameter> parameters = request.getParameters();
            if (CollectionUtils.isNotEmpty(parameters)) {
                Object object;
                for (Parameter temp: parameters) {
                    String key = temp.getKey();
                    String toKey= temp.getToKey();
                    String scope = temp.getScope();
                    String defaultVal = temp.getValue();
                    if (StringUtils.isEmpty(key)) {
                        continue;
                    }
                    try {
                        String[] values = servletrequest.getParameterValues(key);
                        if (values == null || values.length == 1) {
                            if (StringUtils.isEmpty(scope)) {
                                scope = Constants.SCOPE.REQUEST;
                            }
                            switch (scope){
                                case Constants.SCOPE.CONSTANTS :{
                                    Field field = Class.forName(Constants.SCOP_VALUE.CONSTANTS).getDeclaredField(key);
                                    object = field.get(field.getName());
                                    break;
                                }
                                case Constants.SCOPE.PROPERTIES :{
                                    object = PropertiesUtil.getString(key);
                                    break;
                                }
                                default :{
                                    object = servletrequest.getParameter(key);
                                    break;
                                }
                            }
                            String value = object == null? defaultVal: String.valueOf(object);
                            addParam(returnParams, key, toKey, value);
                        } else {
                            addBeans(returnParams, key, toKey, values);
                        }
                    } catch (Exception e) {
                        Logger.error("请求{}参数{}解析失败", path, key);
                        e.printStackTrace();
                    }
                }
            }
        }
        if (MapUtils.isEmpty(returnParams)) {
            Logger.error("根据{}处理请求参数失败", path);
            throw new CommonException("根据" + path + " 处理请求参数失败");
        } else {
            return returnParams;
        }
    }

    public static void addParam(Map<String, Object> map, String key, String toKey, Object value) {
        if (map != null) {
            map.put(key, value);
            if (StringUtils.isNoneEmpty(toKey)) {
                map.put(toKey, value);
            }
        }
    }

    public static void addBeans(Map<String, Object> map, String key, String toKey, Object value) {
        if (map != null && value instanceof Array) {
            String[] values = (String[])value;
            List<Map<String, Object>> beans = new ArrayList<>();
            for (String str : values) {
                Map<String, Object> temp1 = new HashMap<>();
                temp1.put(key, str);
                beans.add(temp1);
                if (StringUtils.isNotEmpty(toKey)) {
                    Map<String, Object> temp2 = new HashMap<>();
                    temp2.put(toKey, str);
                    beans.add(temp2);
                }
            }
            if (map.containsKey("beans")) {
                List<Map<String, Object>> reBeans = (List<Map<String, Object>>)map.get("beans");
                reBeans.addAll(beans);
            } else {
                map.put("beans", beans);
            }
        }
    }

}
