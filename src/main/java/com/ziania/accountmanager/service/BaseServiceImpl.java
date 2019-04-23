package com.ziania.accountmanager.service;

import com.ziania.accountmanager.dao.interfaces.IBaseDao;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * base Service
 * @author chenzhinian
 * @date 20190419
 */
public class BaseServiceImpl {

    @Autowired
    private IBaseDao baseDao;

    public IBaseDao getBaseDao() {
        return baseDao;
    }

    public void setBaseDao(IBaseDao baseDao) {
        this.baseDao = baseDao;
    }

}
