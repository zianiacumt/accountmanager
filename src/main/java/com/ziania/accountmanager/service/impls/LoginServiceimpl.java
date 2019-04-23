package com.ziania.accountmanager.service.impls;

import com.ziania.accountmanager.dao.interfaces.ITAccountmangerUserService;
import com.ziania.accountmanager.domain.TAccountmangerUser;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.ILoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    protected ITAccountmangerUserService accountmangerUserService;

    /**
     * 登陆
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> login(Map<String, Object> params) throws CommonException {
        return accountmangerUserService.selectByCond(params);
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
        params.put(TAccountmangerUser.ACCOUNT_USER_ID, 1);
        params.put(TAccountmangerUser.ACCOUNT_USER_NAME, "admin");
        params.put(TAccountmangerUser.ACCOUNT_USER_AGE, 12);
        params.put(TAccountmangerUser.ACCOUNT_USER_CRTIME, new Date());
        return accountmangerUserService.insertSelective(params);
    }

}
