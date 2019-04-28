package com.ziania.accountmanager.core.xml;

import java.io.Serializable;

public class Parameter implements Serializable {

    private String key;

    private String toKey;

    private String type;

    private String scope;

    private String value;

    private String validate;

    private String desc;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getToKey() {
        return toKey;
    }

    public void setToKey(String toKey) {
        this.toKey = toKey;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValidate() {
        return validate;
    }

    public void setValidate(String validate) {
        this.validate = validate;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

}
