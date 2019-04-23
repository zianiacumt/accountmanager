package com.ziania.accountmanager.util;

import org.apache.commons.lang.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 时间相关工具类
 * @author chenzhinian
 * @date 20190415
 */
public class DateUtil {

    public static final String DEFAULT_PATTERN = "yyyy-MM-dd HH:mm:ss";

    public static final String YYYY_PATTERN = "yyyy";

    private DateUtil(){

    }

    /**
     * 获取默认格式化时间
     * 格式化：YYYY-MM-dd HH:mm:ss
     * @return
     */
    public static String getCurrentTime(){
        SimpleDateFormat format = new SimpleDateFormat(DEFAULT_PATTERN);
        return format.format(new Date());
    }

    /**
     * 获取指定格式化的时间
     * @param pattern
     * @return
     */
    public static String getCurretnTime(String pattern){
        if(StringUtils.isEmpty(pattern)){
            pattern = DEFAULT_PATTERN;
        }
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.format(new Date());
    }

    /**
     * 一种格式化的时间串转换为另一种格式化时间串
     * @param value
     * @param pattern
     * @return
     */
    public static String string2String(String value, String pattern){
        try {
            SimpleDateFormat format = new SimpleDateFormat(pattern);
            Date date = format.parse(value);
            format = new SimpleDateFormat(DEFAULT_PATTERN);
            return format.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }



    public static void main(String[] agres){
        DateUtil.string2String("20190415201258", "yyyyMMddHHmmss");
    }

}
