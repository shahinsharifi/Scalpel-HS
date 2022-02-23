package org.tudelft.wis.crowdsourcing.component.annotation.dao;

import org.springframework.data.repository.CrudRepository;
import org.tudelft.wis.crowdsourcing.component.annotation.model.SceneAnnotation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Session;

import javax.transaction.Transactional;


@Transactional
public interface SceneAnnotationDao extends CrudRepository<SceneAnnotation, Integer> {

}
