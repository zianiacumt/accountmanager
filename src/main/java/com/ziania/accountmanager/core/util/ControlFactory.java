package com.ziania.accountmanager.core.util;

import com.ziania.accountmanager.core.xml.Control;
import com.ziania.accountmanager.core.xml.Include;
import org.apache.commons.digester3.Digester;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.util.List;

public class ControlFactory {

    private static final String FILE_BATH_PATH = "config/control.xml";

    private static Control control;

    private static Digester digester;

    static {
        initDigester();
    }

    public static synchronized Control getControl () {
        try {
            if (control == null) {
                control = (Control) digester.parse(ClassLoader.getSystemResourceAsStream(FILE_BATH_PATH));
                List<Include> includeList = control.getIncludes();
                if (includeList != null && includeList.size() > 0) {
                    for (Include include : includeList) {
                        Control subControl = digester.parse(ClassLoader.getSystemResource(include.getFile()));
                        control.addRequest(subControl.getRequests());
                    }
                }
            }
        } catch (Exception exp) {
            exp.printStackTrace();
            System.out.println("解析control.xml文件失败");
        }
        return control;
    }

    /**
     * 初始化
     */
    private static void initDigester () {
        if (digester == null) {
            digester = new Digester();
            digester.addObjectCreate("control", "com.ziania.accountmanager.core.xml.Control");
            digester.addSetProperties("control");

            digester.addObjectCreate("control/request", "com.ziania.accountmanager.core.xml.Request");
            digester.addSetProperties("control/request");
            digester.addSetNext("control/request", "addRequest", "com.ziania.accountmanager.core.xml.Request");

            digester.addObjectCreate("control/include", "com.ziania.accountmanager.core.xml.Include");
            digester.addSetProperties("control/include");
            digester.addSetNext("control/include", "addInclude", "com.ziania.accountmanager.core.xml.Include");

            digester.addObjectCreate("control/request/parameter", "com.ziania.accountmanager.core.xml.Parameter");
            digester.addSetProperties("control/request/parameter");
            digester.addSetNext("control/request/parameter", "addParameter", "com.ziania.accountmanager.core.xml.Parameter");
        }
    }

    /**
     * 清空
     */
    public static void clearControl () {
        digester.clear();
    }

}
