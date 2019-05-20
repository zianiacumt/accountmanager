package com.ziania.accountmanager.redis;

import com.ziania.accountmanager.exception.CommonException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.stereotype.Component;

@Component("redisService")
public class RedisServiceImpl implements IRedisService {

    @Autowired
    @Qualifier("redisTemplate")
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 根据key获取value
     *
     * @param key
     * @return
     * @throws CommonException
     */
    @Override
    public String get(String key) throws CommonException {
        String result = this.redisTemplate.execute(new RedisCallback<String>() {
            @Override
            public String doInRedis(RedisConnection connection) throws DataAccessException {
                RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
                byte[] value = connection.get(serializer.serialize(key));
                return serializer.deserialize(value);
            }
        });
        return result;
    }

    /**
     * 设置key-value
     *
     * @param key
     * @param value
     * @throws CommonException
     */
    @Override
    public void set(String key, String value) throws CommonException {
        this.redisTemplate.opsForValue().set(key, value);
    }

}
