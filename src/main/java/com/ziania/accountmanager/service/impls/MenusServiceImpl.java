package com.ziania.accountmanager.service.impls;

import com.ziania.accountmanager.dao.interfaces.ITAccountmangerMenusService;
import com.ziania.accountmanager.domain.TAccountmangerMenus;
import com.ziania.accountmanager.exception.CommonException;
import com.ziania.accountmanager.service.interfaces.IMenusService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("menusService")
public class MenusServiceImpl implements IMenusService {

    private static final Logger logger = LoggerFactory.getLogger(MenusServiceImpl.class);

    @Autowired
    @Qualifier("accountmangerMenusService")
    private ITAccountmangerMenusService accountmangerMenusService;

    /**
     * 查询个人菜单
     *
     * @param params
     * @throws CommonException
     */
    @Override
    public Map<String, Object> getSelfMenus(Map<String, Object> params) throws CommonException {
        Map<String, Object> resultMap = accountmangerMenusService.selectByCond(params);
        if (MapUtils.isNotEmpty(resultMap) && resultMap.containsKey("beans")) {
            List<Map<String, Object>> menusList = (List<Map<String,Object>>) resultMap.get("beans");
            List<Map<String, Object>> parentList = new ArrayList<>();
            String superMenuId;
            for (Map<String, Object> tempMap : menusList) {
                superMenuId = MapUtils.getString(tempMap, TAccountmangerMenus.SUPER_MENU_ID);
                if (StringUtils.isEmpty(superMenuId) || StringUtils.equals("0", superMenuId)) {
                    parentList.add(tempMap);
                }
            }
            if (CollectionUtils.isNotEmpty(parentList)) {
                String menuId;
                for (Map<String, Object> temp1 : parentList) {
                    menuId = MapUtils.getString(temp1, TAccountmangerMenus.MENU_ID);
                    List<Map<String, Object>> subMenus = new ArrayList<>();
                    for (Map<String, Object> temp2 : menusList) {
                        superMenuId = MapUtils.getString(temp2, TAccountmangerMenus.SUPER_MENU_ID);
                        if (StringUtils.equals(menuId, superMenuId)) {
                            subMenus.add(temp2);
                        }
                    }
                    if (CollectionUtils.isNotEmpty(subMenus)) {
                        temp1.put("subMenus", subMenus);
                    }
                }
            }
            resultMap.put("beans", parentList);
        }
        return resultMap;
    }

}
