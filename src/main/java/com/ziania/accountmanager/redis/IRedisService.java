package com.ziania.accountmanager.redis;

import com.ziania.accountmanager.exception.CommonException;

public interface IRedisService {

    /**
     * 根据key获取value
     * @param key
     * @return
     * @throws CommonException
     */
    String get(String key) throws CommonException;

    /**
     * 设置key-value
     * @param key
     * @param value
     * @throws CommonException
     */
    void set(String key, String value) throws CommonException;

}
