package com.ziania.accountmanager.util;

import java.util.UUID;

public class IDGenerator {

    private IDGenerator () {

    }

    public static String getUUID() {
        return UUID.randomUUID().toString();
    }

}
