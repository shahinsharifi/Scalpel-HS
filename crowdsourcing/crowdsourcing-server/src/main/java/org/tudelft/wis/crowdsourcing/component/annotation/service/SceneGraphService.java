package org.tudelft.wis.crowdsourcing.component.annotation.service;


import org.tudelft.wis.crowdsourcing.component.annotation.model.SceneGraph;

import java.util.List;

public interface SceneGraphService {

    public List<SceneGraph> getAllBySceneName(String imageName);
}
