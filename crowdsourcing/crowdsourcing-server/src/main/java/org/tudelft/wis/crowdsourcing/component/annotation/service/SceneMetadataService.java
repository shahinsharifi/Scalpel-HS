package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.tudelft.wis.crowdsourcing.component.annotation.model.Objects;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Relations;

import java.util.List;

public interface SceneMetadataService {
    public List<Objects> getAllObjects();
    public List<Relations> getAllRelations();
}
