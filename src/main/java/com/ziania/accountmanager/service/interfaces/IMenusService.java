package com.ziania.accountmanager.service.interfaces;

import com.ziania.accountmanager.exception.CommonException;

import java.util.Map;

public interface IMenusService {

    /**
     * 查询个人菜单
     * @param params
     * @throws CommonException
     */
    Map<String, Object> getSelfMenus(Map<String, Object> params) throws CommonException;

}
