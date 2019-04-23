package com.ziania.accountmanager.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 过滤器
 */

public class FilterConfiguration {

    public FilterRegistrationBean registFilters(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new LoggerFilter());
        return filterRegistrationBean;
    }
}
