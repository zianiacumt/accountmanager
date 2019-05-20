package com.ziania.accountmanager.cache.impls;

import com.ziania.accountmanager.cache.interfaces.ICommonCodeCache;
import com.ziania.accountmanager.exception.CommonException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.SerializationUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component("commonCodeCache")
public class CommonCodeCache implements ICommonCodeCache {

    @Autowired
    @Qualifier("redisTemplate")
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public void addStringCahce(String key, String value) throws CommonException {

    }

    @Override
    public String getStringCache(String key) throws CommonException {
        return null;
    }

    @Override
    public List<Map<String, Object>> getRedisMembers(String key) throws CommonException {
        List<Map<String, Object>> resultList = new ArrayList<>();
        Set<Object> tempSet = redisTemplate.opsForSet().members(key);
        if (!CollectionUtils.isEmpty(tempSet)) {
            for (Object object: tempSet) {
                resultList.addAll((List<Map<String, Object>>)SerializationUtils.deserialize((byte[])object));
            }
        }
        return resultList;
    }

    @Override
    public void set(String key, Object object) throws CommonException {
        this.redisTemplate.opsForSet().add(key, SerializationUtils.serialize(object));
    }
}
