package com.ziania.accountmanager.cache.interfaces;

import com.ziania.accountmanager.exception.CommonException;

import java.util.List;
import java.util.Map;

public interface ICommonCodeCache {

    void addStringCahce(String key, String value) throws CommonException;

    String getStringCache(String key) throws CommonException;

    List<Map<String, Object>> getRedisMembers(String key) throws CommonException;

    void set(String key, Object object) throws CommonException;

}
