package com.ziania.accountmanager.dao.impls;

import com.ziania.accountmanager.dao.interfaces.IBaseDao;
import org.apache.commons.collections.MapUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * baseDao
 * @author chenzhinian
 * @date 20190419
 */

@Repository(value="baseDao")
public class BaseDaoImpl implements IBaseDao {

    @Autowired
    private SqlSession sqlSession;


    /**
     * 根据主键查询
     *
     * @param sqlId
     * @param id
     * @return
     */
    @Override
    public <T> T selectOne(String sqlId, int id) {
        return sqlSession.selectOne(sqlId, id);
    }

    /**
     * 根据条件获取一个对象
     *
     * @param sqlId
     * @param params
     * @return
     */
    @Override
    public <T> T selectByPrimaryKey(String sqlId, Map<String, Object> params) {
        return sqlSession.selectOne(sqlId, params);
    }

    /**
     * 根据条件查询
     *
     * @param sqlId
     * @param params
     * @return
     */
    @Override
    public <E> List<E> selectByCond(String sqlId, Map<String, Object> params) {
        return sqlSession.selectList(sqlId, params);
    }

    /**
     * 新增
     *
     * @param sqlId
     * @param params
     * @return
     */
    @Override
    public int insertSelective(String sqlId, Map<String, Object> params) {
        return sqlSession.insert(sqlId, params);
    }

    /**
     * 更新
     *
     * @param sqlId
     * @param params
     * @return
     */
    @Override
    public int updateByPrimaryKey(String sqlId, Map<String, Object> params) {
        Object primaryKey = params.get("primaryKey");
        return sqlSession.update(sqlId, primaryKey);
    }

    /**
     * 根据主键删除
     *
     * @param sqlId
     * @param params
     * @return
     */
    @Override
    public int deleteByPrimaryKey(String sqlId, Map<String, Object> params) {
        Object primaryKey = params.get("primaryKey");
        return sqlSession.delete(sqlId, primaryKey);
    }

    /**
     * 根据条件删除
     *
     * @param sqlId
     * @param params
     * @return
     */
    @Override
    public int deleteByCond(String sqlId, Map<String, Object> params) {
        return sqlSession.delete(sqlId, params);
    }

    /**
     * 根据条件查询数量
     *
     * @param sqlId
     * @param params
     * @return
     */
    @Override
    public int queryCount(String sqlId, Map<String, Object> params) {
        return sqlSession.selectOne(sqlId, params);
    }

}
