package org.tudelft.wis.crowdsourcing.component.annotation.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Objects;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Relations;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;

import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;


@Transactional
public interface SceneObjectDao extends CrudRepository<Objects, Integer> {

    @Query(value = "SELECT *  FROM objects ORDER BY name asc", nativeQuery = true)
    List<Objects> findAllObjects();

}
