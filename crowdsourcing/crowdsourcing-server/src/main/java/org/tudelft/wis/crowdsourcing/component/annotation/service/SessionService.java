package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Session;

import java.util.List;
import java.util.Map;

public interface SessionService {
    public Integer insert(Session session);
    public List<Map<String,Object>> getAll();
    public Integer getCountBySessionId(Session session);
}
