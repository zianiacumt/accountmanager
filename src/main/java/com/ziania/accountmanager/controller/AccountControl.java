package com.ziania.accountmanager.controller;

import com.ziania.accountmanager.constants.Constants;
import com.ziania.accountmanager.core.util.ControlRequestUtil;
import com.ziania.accountmanager.core.util.ControlResponseUtil;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.IAccountService;
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
public class AccountControl {

    private static final Logger logger = LoggerFactory.getLogger(AccountControl.class);

    @Autowired
    @Qualifier("accountService")
    private IAccountService accountService;

    @RequestMapping("/quryAccountInfo")
    public void quryAccountInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> resultMap = new HashMap<>();
        try{
            resultMap = accountService.quryAccountInfo(params);
            resultMap.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp) {
            logger.error("查询账号信息失败", exp);
            resultMap.put("returnCode", Constants.RETURN_CODE_FAIL);
            resultMap.put("returnMsg", exp.getMessage());
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, resultMap);
        }
    }

    @RequestMapping("addAccountInfo")
    public void addAccountInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> resultMap = new HashMap<>();
        try{
            resultMap = accountService.addAccountInfo(params);
            resultMap.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp) {
            logger.error("新增账号信息失败", exp);
            resultMap.put("returnCode", Constants.RETURN_CODE_FAIL);
            resultMap.put("returnMsg", exp.getMessage());
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, resultMap);
        }
    }

    @RequestMapping("modifyAccountInfo")
    public void modifyAccountInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> resultMap = new HashMap<>();
        try{
            resultMap = accountService.modifyAccountInfo(params);
            resultMap.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp) {
            logger.error("查询账号信息失败", exp);
            resultMap.put("returnCode", Constants.RETURN_CODE_FAIL);
            resultMap.put("returnMsg", exp.getMessage());
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, resultMap);
        }
    }

    @RequestMapping("deleteAccountInfo")
    public void deleteAccountInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        Map<String, Object> resultMap = new HashMap<>();
        try{
            resultMap = accountService.deleteAccountInfo(params);
            resultMap.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        } catch (CommonException exp) {
            logger.error("查询账号信息失败", exp);
            resultMap.put("returnCode", Constants.RETURN_CODE_FAIL);
            resultMap.put("returnMsg", exp.getMessage());
            throw new CommonException(exp.getMessage());
        } finally {
            ControlResponseUtil.response(response, resultMap);
        }
    }

}
