package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SceneAnnotationDao;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SessionDao;
import org.tudelft.wis.crowdsourcing.component.annotation.model.SceneAnnotation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Session;

@Service("sceneAnnotationManager")
public class SceneAnnotationServiceImpl implements SceneAnnotationService {

    @Autowired
    private SceneAnnotationDao sceneAnnotationDao;


    @Override
    public Integer insert(SceneAnnotation sceneAnnotation) {
        SceneAnnotation result = sceneAnnotationDao.save(sceneAnnotation);
        return result.getId();
    }
}
