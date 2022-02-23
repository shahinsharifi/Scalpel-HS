package org.tudelft.wis.crowdsourcing.component.annotation.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Objects;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Relations;

import javax.transaction.Transactional;
import java.util.List;


@Transactional
public interface SceneRelationDao extends CrudRepository<Relations, Integer> {

    @Query(value = "SELECT *  FROM relations ORDER BY name asc", nativeQuery = true)
    List<Relations> findAllRelations();

}
