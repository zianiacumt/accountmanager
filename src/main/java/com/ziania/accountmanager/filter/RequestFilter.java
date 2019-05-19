package com.ziania.accountmanager.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.util.Map;


public class RequestFilter implements Filter {

    private static final Logger Logger = LoggerFactory.getLogger(RequestFilter.class);

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) {
        try {
            Logger.info("preDealRequestParam start");
            this.preDealRequestParam(servletRequest);
            Logger.info("preDealRequestParam end");
            filterChain.doFilter(servletRequest, servletResponse);
        } catch (Exception ex){
            Logger.info("preDealRequestParam error:" + ex);
        }
    }

    /**
     * 封装请求参数
     */
    private void preDealRequestParam (ServletRequest request) {
        ThreadLocal<Map<String, Object>> local = new ThreadLocal();
    }

}
