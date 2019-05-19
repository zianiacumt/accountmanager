package com.ziania.accountmanager.service.impls;

import com.alibaba.druid.support.json.JSONUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ziania.accountmanager.constants.Constants;
import com.ziania.accountmanager.dao.impls.TAccountmangerCodeServiceImpl;
import com.ziania.accountmanager.domain.TAccountmangerCode;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.redis.IRedisService;
import com.ziania.accountmanager.service.interfaces.ICommonCodeService;
import com.ziania.accountmanager.util.IDGenerator;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service(value="commonCodeService")
public class CommonCodeServiceImpl implements ICommonCodeService {

    private static final Logger logger = LoggerFactory.getLogger(CommonCodeServiceImpl.class);

    @Autowired
    @Qualifier("accountmangerCodeServiceImpl")
    private TAccountmangerCodeServiceImpl accountmangerCodeServiceImpl;
    @Autowired
    @Qualifier("redisService")
    private IRedisService redisService;

    /**
     * 根据条件查询码表
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> quryCode(Map<String, Object> params) throws CommonException {
        return accountmangerCodeServiceImpl.selectByCond(params);
    }

    /**
     * 根据codeTypeCd查询
     * 优先从缓存获取,再从数据库获取
     * @param params
     * @return
     * @throws CommonException
     */
    public Map<String, Object> quryCodeByCodeTypeCd(Map<String, Object> params) throws CommonException {
        String codeKey = MapUtils.getString(params, "codeTypeCd");
        Map<String, Object> codeInfoMap = new HashMap<>();
        if (!StringUtils.isEmpty(codeKey)) {
            String value = null;
            try {
                value = redisService.get(codeKey);
                logger.info("根据key:{0}获取的redis值:{1}", codeKey, value);
            } catch (Exception ex) {
                logger.error("获取redis值失败,key={0}", codeKey);
            }

            //从数据库获取
            if (StringUtils.isEmpty(value)) {
                codeInfoMap = accountmangerCodeServiceImpl.selectByCond(params);
                if (MapUtils.isNotEmpty(codeInfoMap)) {//放入缓存
                    if (codeInfoMap.containsKey("beans") && CollectionUtils.isNotEmpty((List)codeInfoMap.get("beans"))) {
                        JSONArray jsonArray = new JSONArray();
                        for (Map<String, Object> temp : (List<Map<String, Object>>)codeInfoMap.get("beans")) {
                            JSONObject jsonObject = new JSONObject();
                            jsonObject.put("codeName", MapUtils.getString(temp, "codeName"));
                            jsonObject.put("bizCode", MapUtils.getString(temp, "bizCode"));
                            jsonArray.add(jsonObject);
                        }
                        redisService.set(codeKey, JSONUtils.toJSONString(jsonArray));
                    }
                }
            } else {
                codeInfoMap.put("beans", JSONUtils.parse(value));
            }
        }
        return codeInfoMap;
    }

    /**
     * 新增码表配置
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> addCode(Map<String, Object> params) throws CommonException {
        Map<String, Object> object = new HashMap<>();
        object.put(TAccountmangerCode.CODE_ID, IDGenerator.getUUID());
        object.put(TAccountmangerCode.CODE_FULL_NAME, "性别->男");
        object.put(TAccountmangerCode.CODE_NAME, "男");
        object.put(TAccountmangerCode.CODE_TYPE_CD, "COMMON_CODE@SEX");
        object.put(TAccountmangerCode.BIZ_CODE, Constants.SEX_MALE);
        object.put(TAccountmangerCode.VALID_FLAG, Constants.VALID_FLAG_YES);
        object.put(TAccountmangerCode.CREATE_TIME, new Date());
        object.put(TAccountmangerCode.MODIFY_TIME, new Date());
        return null;
    }

    /**
     * 删除码表配置
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> deleteCode(Map<String, Object> params) throws CommonException {
        return null;
    }

    /**
     * 修改码表配置
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> modifyCode(Map<String, Object> params) throws CommonException {
        return null;
    }

}
