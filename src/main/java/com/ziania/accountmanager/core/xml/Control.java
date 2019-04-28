package com.ziania.accountmanager.core.xml;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Control implements Serializable {

    private List<Include> includes;

    private List<Request> requests;

    public Control() {
        this.includes = new ArrayList<>();
        this.requests = new ArrayList<>();
    }

    public List<Include> getIncludes() {
        return includes;
    }

    public void setIncludes(List<Include> includes) {
        this.includes = includes;
    }

    public void addInclude(Include include) {
        this.includes.add(include);
    }

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public void addRequest(List<Request> requests) {
        for (Request request: requests) {
            this.requests.add(request);
        }
    }

    public void addRequest(Request request) {
        this.requests.add(request);
    }

}
