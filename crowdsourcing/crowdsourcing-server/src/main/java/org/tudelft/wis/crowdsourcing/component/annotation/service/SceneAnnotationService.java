package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.tudelft.wis.crowdsourcing.component.annotation.model.SceneAnnotation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Session;

public interface SceneAnnotationService {
    public Integer insert(SceneAnnotation sceneAnnotation);
}
