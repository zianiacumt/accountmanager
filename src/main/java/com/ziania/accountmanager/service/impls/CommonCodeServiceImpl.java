package com.ziania.accountmanager.service.impls;

import com.ziania.accountmanager.constants.Constants;
import com.ziania.accountmanager.dao.impls.TAccountmangerCodeServiceImpl;
import com.ziania.accountmanager.domain.TAccountmangerCode;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.ICommonCodeService;
import com.ziania.accountmanager.util.IDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service(value="commonCodeService")
public class CommonCodeServiceImpl implements ICommonCodeService {

    @Autowired
    private TAccountmangerCodeServiceImpl accountmangerCodeServiceImpl;

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
