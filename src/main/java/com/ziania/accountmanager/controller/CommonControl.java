package com.ziania.accountmanager.controller;


import com.ziania.accountmanager.constants.Constants;
import com.ziania.accountmanager.core.util.ControlRequestUtil;
import com.ziania.accountmanager.core.util.ControlResponseUtil;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.ICommonCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * CommonControl
 * @author chenzhinian
 * @date 20190514
 */

@RestController
public class CommonControl {

    private static final Logger logger = LoggerFactory.getLogger(CommonControl.class);

    @Autowired
    private ICommonCodeService commonCodeService;

    /**
     * 查询码值
     * @param request
     * @param response
     */
    @RequestMapping("/quryCode")
    public void quryCode(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> codeResult = new HashMap<>();
        try {
            codeResult = commonCodeService.quryCode(params);
            codeResult.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp){
            logger.error(exp.getMessage(), exp);
            codeResult.put("returnCode", Constants.RETURN_CODE_FAIL);
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, codeResult);
        }
    }

    /**
     * 新增码值
     * @param request
     * @param response
     * @throws CommonException
     */
    @RequestMapping("/addCode")
    public void addCode(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> codeResult = new HashMap<>();
        try {
            codeResult = commonCodeService.addCode(params);
            codeResult.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp){
            logger.error(exp.getMessage(), exp);
            codeResult.put("returnCode", Constants.RETURN_CODE_FAIL);
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, codeResult);
        }
    }

    /**
     * 修改码值
     * @param request
     * @param response
     * @throws CommonException
     */
    @RequestMapping("/modifyCode")
    public void modifyCode(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> codeResult = new HashMap<>();
        try {
            codeResult = commonCodeService.modifyCode(params);
            codeResult.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp){
            logger.error(exp.getMessage(), exp);
            codeResult.put("returnCode", Constants.RETURN_CODE_FAIL);
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, codeResult);
        }
    }

    /**
     * 删除码值
     * @param request
     * @param response
     * @throws CommonException
     */
    @RequestMapping("/deleteCode")
    public void deleteCode(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> codeResult = new HashMap<>();
        try {
            codeResult = commonCodeService.deleteCode(params);
            codeResult.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp){
            logger.error(exp.getMessage(), exp);
            codeResult.put("returnCode", Constants.RETURN_CODE_FAIL);
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, codeResult);
        }
    }

}
