package org.tudelft.wis.crowdsourcing.component.annotation.dao;
import org.springframework.data.repository.CrudRepository;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Annotation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.SceneGraph;

import javax.transaction.Transactional;
import java.util.List;


@Transactional
public interface AnnotationDao extends CrudRepository<Annotation, Integer> {

    public List<Annotation> findAnnotationsBySessionId(Integer sessionId);

}
