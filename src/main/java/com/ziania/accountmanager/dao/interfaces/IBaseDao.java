package com.ziania.accountmanager.dao.interfaces;

import java.util.List;
import java.util.Map;

/**
 * 数据库常用操作
 * @author chenzhinian
 * @date 20190419
 */
public interface IBaseDao {

    /**
     * 根据主键查询
     * @param sqlId
     * @param id
     * @param <T>
     * @return
     */
    <T> T selectOne(String sqlId, int id);

    /**
     * 根据条件获取一个对象
     * @param sqlId
     * @param params
     * @param <T>
     * @return
     */
    <T> T selectByPrimaryKey(String sqlId, Map<String, Object> params);

    /**
     * 根据条件查询
     * @param sqlId
     * @param params
     * @param <E>
     * @return
     */
    <E> List<E> selectByCond(String sqlId, Map<String, Object> params);

    /**
     * 新增
     * @param sqlId
     * @param params
     * @return
     */
    int insertSelective(String sqlId, Map<String, Object> params);

    /**
     * 更新
     * @param sqlId
     * @param params
     * @return
     */
    int updateByPrimaryKey(String sqlId, Map<String, Object> params);

    /**
     * 根据主键删除
     * @param sqlId
     * @param params
     * @return
     */
    int deleteByPrimaryKey(String sqlId, Map<String, Object> params);

    /**
     * 根据条件删除
     * @param sqlId
     * @param params
     * @return
     */
    int deleteByCond(String sqlId, Map<String, Object> params);

    /**
     * 根据条件查询数量
     * @param sqlId
     * @param params
     * @return
     */
    int queryCount(String sqlId, Map<String, Object> params);

}
