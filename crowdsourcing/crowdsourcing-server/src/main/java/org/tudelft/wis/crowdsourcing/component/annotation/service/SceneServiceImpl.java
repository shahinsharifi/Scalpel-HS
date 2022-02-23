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

@Service("sceneManager")
public class SceneServiceImpl implements SceneService {

    @Autowired
    private SceneDao sceneDao;


    @Override
    public boolean insert(Scene scene) {
        sceneDao.save(scene);
        return true;
    }

    @Override
    public Scene getOneRandomly() {

        //getting a scene randomly
        List<Scene> scenes = sceneDao.findSingleSceneRandomly();
        return (scenes != null && scenes.size() > 0) ? scenes.get(0) : null;
    }


    @Override
    public Scene getSceneByImageName(String imageName) {
        return sceneDao.findSceneByImageName(imageName);
    }

    @Override
    public Scene findSceneByImageNameContaining(String imageName) {
        return sceneDao.findSceneByImageNameContaining(imageName);
    }

    @Override
    public List<Scene> getSceneByRandomSampling(Scene scene) {
        return sceneDao.getRandomScenes(scene);
    }
}
