package com.ziania.accountmanager.service.interfaces;

import com.ziania.accountmanager.exception.CommonException;

import java.util.Map;

public interface IDatabaseInfoService {

    /**
     * 新增数据库信息
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> addDatabaseInfo(Map<String, Object> params) throws CommonException;

    /**
     * 查询数据库信息
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> quryDatabaseInfo(Map<String, Object> params) throws CommonException;

    /**
     * 修改数据库信息
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> modifyDatabaseInfo(Map<String, Object> params) throws CommonException;

    /**
     * 删除数据库信息
     * @param params
     * @return
     * @throws CommonException
     */
    Map<String, Object> deleteDatabaseInfo(Map<String, Object> params) throws CommonException;

}
