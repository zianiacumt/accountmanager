package com.ziania.accountmanager.service.interfaces;

import com.ziania.accountmanager.exception.CommonException;

import java.util.Map;

/**
 * 登录业务
 * @author chenzhinian
 * @date 20190415
 */
public interface ILoginService {

    /**
     * 登陆
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> login(Map<String, Object> params) throws CommonException;

    /**
     * 注册
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> register(Map<String, Object> params) throws CommonException;

}
