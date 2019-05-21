package com.ziania.accountmanager.service.impls;

import com.ziania.accountmanager.dao.interfaces.ITAccountmangerAccountService;
import com.ziania.accountmanager.domain.TAccountmangerAccount;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.IAccountService;
import com.ziania.accountmanager.util.IDGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service("accountService")
public class AccountServiceImpl implements IAccountService {

    private static final Logger logger = LoggerFactory.getLogger(AccountServiceImpl.class);

    @Autowired
    @Qualifier("accountmangerAccountService")
    private ITAccountmangerAccountService accountmangerAccountService;

    /**
     * 查询账号信息
     *
     * @param params
     * @return
     */
    @Override
    public Map<String, Object> quryAccountInfo(Map<String, Object> params) throws CommonException {
        return accountmangerAccountService.selectByCond(params);
    }

    /**
     * 新增账号
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> addAccountInfo(Map<String, Object> params) throws CommonException {
        params.put(TAccountmangerAccount.ACCOUNT_ID, IDGenerator.getUUID());
        params.put(TAccountmangerAccount.ACCOUNT_CRTIME, new Date());
        params.put(TAccountmangerAccount.ACCOUNT_MODFIME, new Date());
        return accountmangerAccountService.insertSelective(params);
    }

    /**
     * 修改账号信息
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> modifyAccountInfo(Map<String, Object> params) throws CommonException {
        return accountmangerAccountService.updateByPrimaryKey(params);
    }

    /**
     * 删除账号信息
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> deleteAccountInfo(Map<String, Object> params) throws CommonException {
        return accountmangerAccountService.deleteByPrimaryKey(params);
    }

}
