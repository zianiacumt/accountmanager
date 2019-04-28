package com.ziania.accountmanager.controller;

import com.ziania.accountmanager.core.util.ControlRequestUtil;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.ILoginService;
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
 * 登录control
 * @author chenzhinian
 * @date 20190415
 */
@RestController
public class LoginControl {

    private static final Logger Logger = LoggerFactory.getLogger(LoginControl.class);

    @Autowired
    private ILoginService loginService;

    @RequestMapping("/signIn")
    public String signIn (HttpServletRequest request, HttpServletResponse response) throws CommonException {
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        Map<String, Object> params = new HashMap<>();
        params.put("userName", userName);
        params.put("password", password);
        loginService.signIn(params);
        return "SignIn Success";
    }

    @RequestMapping("/register")
    public String register (HttpServletRequest request, HttpServletResponse response) throws CommonException {
        Map<String, Object> params = ControlRequestUtil.createReqParams(request);
        loginService.register(params);
        return "Register Success";
    }

    @RequestMapping("/signOut")
    public String signOut (HttpServletRequest request, HttpServletResponse response) throws CommonException {
        String userName = request.getParameter("userName");
        Map<String, Object> params = new HashMap<>();
        params.put("userName", userName);
        loginService.signOut(params);
        return "SignOut Success";
    }

}