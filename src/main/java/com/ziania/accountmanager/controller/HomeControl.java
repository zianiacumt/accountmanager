package com.ziania.accountmanager.controller;

import com.ziania.accountmanager.constants.Constants;
import com.ziania.accountmanager.core.util.ControlRequestUtil;
import com.ziania.accountmanager.core.util.ControlResponseUtil;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.IMenusService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeControl {

    private static final Logger logger = LoggerFactory.getLogger(HomeControl.class);

    @Autowired
    @Qualifier("menusService")
    private IMenusService menusService;

    @RequestMapping("/getSelfMenus")
    public void getSelfMenus(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap = menusService.getSelfMenus(params);
            resultMap.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (Exception exp) {
            logger.error("查询主页信息失败", exp);
            resultMap.put("returnCode", Constants.RETURN_CODE_FAIL);
            resultMap.put("returnMsg", exp.getMessage());
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, resultMap);
        }
    }

}
