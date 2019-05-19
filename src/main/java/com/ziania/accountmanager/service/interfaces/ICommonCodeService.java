package com.ziania.accountmanager.service.interfaces;

import com.ziania.accountmanager.exception.CommonException;

import java.util.Map;

public interface ICommonCodeService {

    /**
     * 根据条件查询码表
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> quryCode(Map<String, Object> params) throws CommonException;

    /**
     * 根据codeTypeCd查询
     * 优先从缓存获取,再从数据获取
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> quryCodeByCodeTypeCd(Map<String, Object> params) throws CommonException;

    /**
     * 新增码表配置
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> addCode(Map<String, Object> params) throws CommonException;

    /**
     * 删除码表配置
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> deleteCode(Map<String, Object> params) throws CommonException;

    /**
     * 修改码表配置
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> modifyCode(Map<String, Object> params) throws CommonException;

}
