package com.ziania.accountmanager.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * spring boot controller demo
 * @author chenzhinian
 * @date 20190415
 */

@RestController
public class HelloControl {

    @RequestMapping("/hello")
    public String sayHello() {
        return "Hello Word";
    }

}
