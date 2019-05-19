package com.ziania.accountmanager.service.impls;

import com.ziania.accountmanager.constants.Constants;
import com.ziania.accountmanager.dao.interfaces.ITAccountmangerUserService;
import com.ziania.accountmanager.domain.TAccountmangerUser;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.ILoginService;
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
import java.util.Map;

/**
 * 登录业务
 * @author chenzhinian
 * @date 20190415
 */

@Service(value="loginService")
public class LoginServiceimpl implements ILoginService {

    private static final Logger Logger = LoggerFactory.getLogger(LoginServiceimpl.class);

    @Autowired
    @Qualifier("accountmangerUserServiceImpl")
    protected ITAccountmangerUserService accountmangerUserService;

    /**
     * 登陆
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> signIn(Map<String, Object> params) throws CommonException {
        Map<String, Object> result = accountmangerUserService.selectByCond(params);
        if (MapUtils.isEmpty(result)) {
            result.put("returnCode", Constants.RETURN_CODE_FAIL);
        } else {
            result.put("returnCode", Constants.RETURN_CODE_SUCCESS);
        }
        return result;
    }

    /**
     * 注册
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> register(Map<String, Object> params) throws CommonException {
        String sex = MapUtils.getString(params, "sex");
        if (StringUtils.isEmpty(sex)) {
            params.put(TAccountmangerUser.ACCOUNT_USER_SEX, Constants.SEX_UNKNOW);
        }
        params.put(TAccountmangerUser.ACCOUNT_USER_ID, IDGenerator.getUUID());
        params.put(TAccountmangerUser.ACCOUNT_USER_CRTIME, new Date());
        params.put(TAccountmangerUser.ACCOUNT_USER_LAST_MODFTIME, new Date());
        params.put(TAccountmangerUser.ACCOUNT_USER_LAST_SIGNINTIME, new Date());
        params.put(TAccountmangerUser.ACCOUNT_USER_TOTAL_TIMES, Constants.SIGN_IN_TRY_TOTAL_TIMES_3);

        return accountmangerUserService.insertSelective(params);
    }

    /**
     * 注销
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> signOut(Map<String, Object> params) throws CommonException {
        params.put(TAccountmangerUser.ACCOUNT_USER_LAST_MODFTIME, new Date());
        return accountmangerUserService.updateByPrimaryKey(params);
    }

}
