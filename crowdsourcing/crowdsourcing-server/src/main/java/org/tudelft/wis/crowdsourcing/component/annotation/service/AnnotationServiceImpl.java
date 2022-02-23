package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.tudelft.wis.crowdsourcing.component.annotation.dao.AnnotationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Annotation;

import java.util.List;


@Service("annotationManager")
public class AnnotationServiceImpl implements AnnotationService {

    @Autowired
    private AnnotationDao annotationDao;

    @Override
    public boolean insertAll(List<Annotation> annotations) {
        this.annotationDao.saveAll(annotations);
        return true;
    }

    @Override
    public List<Annotation> getAnnotationsBySessionId(Integer sessionId) {
        return this.annotationDao.findAnnotationsBySessionId(sessionId);
    }
}
