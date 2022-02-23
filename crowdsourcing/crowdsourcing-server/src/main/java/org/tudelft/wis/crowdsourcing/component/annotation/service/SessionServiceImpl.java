package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SceneDao;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SessionDao;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Session;

import java.util.List;
import java.util.Map;

@Service("sessionManager")
public class SessionServiceImpl implements SessionService {

    @Autowired
    private SessionDao sessionDao;


    @Override
    public Integer insert(Session session) {
        Session result = sessionDao.save(session);
        return result.getId();
    }

    @Override
    public List<Map<String,Object>> getAll() {
        List<Map<String,Object>> result = sessionDao.findAllSessions();
        return result;
    }

    @Override
    public Integer getCountBySessionId(Session session) {
        return sessionDao.getCountBySessionId(session);
    }
}
