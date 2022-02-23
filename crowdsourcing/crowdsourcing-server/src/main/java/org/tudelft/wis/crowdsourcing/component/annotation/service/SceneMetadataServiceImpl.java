package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SceneObjectDao;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SceneRelationDao;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Objects;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Relations;

import java.util.List;

@Service("metadataManager")
public class SceneMetadataServiceImpl implements SceneMetadataService {

    @Autowired
    private SceneObjectDao sceneObjectDao;

    @Autowired
    private SceneRelationDao sceneRelationDao;

    @Override
    public List<Objects> getAllObjects() {
        return sceneObjectDao.findAllObjects();
    }

    @Override
    public List<Relations> getAllRelations() {
        return sceneRelationDao.findAllRelations();
    }
}
