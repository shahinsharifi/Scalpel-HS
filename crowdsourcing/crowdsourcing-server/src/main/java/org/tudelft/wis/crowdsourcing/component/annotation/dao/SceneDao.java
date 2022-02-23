package org.tudelft.wis.crowdsourcing.component.annotation.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;

import javax.transaction.Transactional;
import java.util.List;


@Transactional
public interface SceneDao extends CrudRepository<Scene, Integer> {

    @Query(value = "SELECT *  FROM scene WHERE category_id is null ORDER BY random() LIMIT 1", nativeQuery = true)
   // @Query(value = "SELECT *  FROM scene where image_name = 'Places365_val_00006480.jpg'", nativeQuery = true)
  //  @Query(value = "SELECT *  FROM scene WHERE c2 is null ORDER BY id LIMIT 1", nativeQuery = true)
    List<Scene> findSingleSceneRandomly();

    @Query(value = "SELECT *  FROM scene where name = :#{#scene.name} ORDER BY random() LIMIT 30", nativeQuery = true)
    List<Scene> getRandomScenes(@Param("scene") Scene scene);

    List<Scene> getSceneByNameAndIdBetween(String name, Integer start, Integer end);

    public Scene findSceneByImageName(String imageName);

    public Scene findSceneByImageNameContaining(String imageName);
}
