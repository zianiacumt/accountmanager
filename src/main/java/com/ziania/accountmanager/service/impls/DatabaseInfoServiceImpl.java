package com.ziania.accountmanager.service.impls;

import com.ziania.accountmanager.dao.interfaces.ITAccountmangerDatabaseService;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.IDatabaseInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service(value="databaseInfoService")
public class DatabaseInfoServiceImpl implements IDatabaseInfoService {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseInfoServiceImpl.class);

    @Autowired
    @Qualifier("accountmangerDatabaseServiceImpl")
    private ITAccountmangerDatabaseService accountmangerDatabaseService;


    /**
     * 新增数据库信息
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> addDatabaseInfo(Map<String, Object> params) throws CommonException {
        return accountmangerDatabaseService.insertSelective(params);
    }

    /**
     * 查询数据库信息
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> quryDatabaseInfo(Map<String, Object> params) throws CommonException {
        return accountmangerDatabaseService.selectByCond(params);
    }

    /**
     * 修改数据库信息
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> modifyDatabaseInfo(Map<String, Object> params) throws CommonException {
        return accountmangerDatabaseService.updateByPrimaryKey(params);
    }

    /**
     * 删除数据库信息
     *
     * @param params
     * @return
     * @throws CommonException
     */
    @Override
    public Map<String, Object> deleteDatabaseInfo(Map<String, Object> params) throws CommonException {
        return accountmangerDatabaseService.deleteByPrimaryKey(params);
    }

}
