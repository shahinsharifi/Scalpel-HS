package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;
import java.util.List;

public interface SceneService {

    public boolean insert(Scene scene);

    public Scene getOneRandomly();

    public Scene getSceneByImageName(String imageName);

    public Scene findSceneByImageNameContaining(String imageName);

    public List<Scene> getSceneByRandomSampling(Scene scene);
}
