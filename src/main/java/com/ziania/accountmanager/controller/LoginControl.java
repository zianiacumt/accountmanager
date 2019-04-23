package com.ziania.accountmanager.controller;

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

    @RequestMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        Map<String, Object> params = new HashMap<>();
        params.put("userName", userName);
        params.put("password", password);
        loginService.login(params);
        return "Login Success";
    }

    @RequestMapping("/register")
    public String register(HttpServletRequest request, HttpServletResponse response) throws CommonException {
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        Map<String, Object> params = new HashMap<>();
        params.put("userName", userName);
        params.put("password", password);
        loginService.register(params);
        return "Register Success";
    }

}
