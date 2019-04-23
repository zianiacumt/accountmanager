package com.ziania.accountmanager.filter;

import com.ziania.accountmanager.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 记录请求日志filter
 */
@Configuration
public class LoggerFilter implements Filter {

    private static final Logger Logger = LoggerFactory.getLogger(LoggerFilter.class);
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String currentTime = DateUtil.getCurrentTime();
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        String url = request.getRequestURL().toString();
        Logger.info("于{}请求{}", currentTime, url);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }

}
