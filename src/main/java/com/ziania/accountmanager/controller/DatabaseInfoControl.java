package com.ziania.accountmanager.controller;

import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.IDatabaseInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * database control
 * @author chenzhinian
 * @date 20190517
 */
@RestController
public class DatabaseInfoControl {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseInfoControl.class);

    @Autowired
    @Qualifier("databaseInfoService")
    private IDatabaseInfoService databaseInfoService;

    @RequestMapping("/addDatabaseInfo")
    public void addDatabaseInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {

    }

    @RequestMapping("/quryDatabaseInfo")
    public void quryDatabaseInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {

    }

    @RequestMapping("/modifyDatabaseInfo")
    public void modifyDatabaseInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {

    }

    @RequestMapping("/deleteDatabaseInfo")
    public void deleteDatabaseInfo(HttpServletRequest request, HttpServletResponse response) throws CommonException {

    }


}
