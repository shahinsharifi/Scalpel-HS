package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SceneDao;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.SceneGraphDao;
import org.tudelft.wis.crowdsourcing.component.annotation.model.SceneGraph;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service("sceneGraphManager")
public class SceneGraphServiceImpl implements SceneGraphService {


    @Autowired
    private SceneGraphDao sceneGraphDao;

    @Override
    public List<SceneGraph> getAllBySceneName(String imageName) {
        List<SceneGraph> graphs = StreamSupport
                .stream(sceneGraphDao.findTop25ByImageNameEqualsAndObject1ScoreGreaterThanEqualAndObject2ScoreGreaterThanEqualOrderByRelationScoreDesc(imageName,0.1,0.1).spliterator(), false)
                .collect(Collectors.toList());
        return graphs;
    }
}
