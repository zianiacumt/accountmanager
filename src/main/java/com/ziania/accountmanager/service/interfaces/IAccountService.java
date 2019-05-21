package com.ziania.accountmanager.service.interfaces;

import com.ziania.accountmanager.exception.CommonException;

import java.util.Map;

public interface IAccountService {

    /**
     * 查询账号信息
     * @param params
     * @return
     */
    Map<String, Object> quryAccountInfo(Map<String, Object> params) throws CommonException;

    /**
     * 新增账号
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> addAccountInfo(Map<String, Object> params) throws CommonException;

    /**
     * 修改账号信息
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> modifyAccountInfo(Map<String, Object> params) throws CommonException;

    /**
     * 删除账号信息
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> deleteAccountInfo(Map<String, Object> params) throws CommonException;

}
