package com.ziania.accountmanager.core.xml;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Request implements Serializable {

    private String path;

    private List<Parameter> parameters;

    public Request() {
        parameters = new ArrayList<>();
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void addParameter(Parameter parameter) {
        this.parameters.add(parameter);
    }

    public List<Parameter> getParameters() {
        return parameters;
    }

    public void setParameters(List<Parameter> parameters) {
        this.parameters = parameters;
    }

}
