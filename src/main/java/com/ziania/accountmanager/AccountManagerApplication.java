package com.ziania.accountmanager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AccountManagerApplication {

	private static final Logger logger = LoggerFactory.getLogger(AccountManagerApplication.class);

	public static void main(String[] args) {
		logger.info("AccountManagerApplication starting...");
		SpringApplication.run(AccountManagerApplication.class, args);
		logger.info("AccountManagerApplication started...");
	}

}
