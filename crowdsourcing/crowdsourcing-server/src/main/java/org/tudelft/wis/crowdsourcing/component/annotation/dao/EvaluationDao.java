package org.tudelft.wis.crowdsourcing.component.annotation.dao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Annotation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Evaluation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;


@Transactional
public interface EvaluationDao extends CrudRepository<Evaluation, Integer> {

    @Query(value = "select count(*) as total from evaluation;", nativeQuery = true)
    Integer getTotalEvaluations();

    @Query(value = "select CASE WHEN wrong_label = 1  THEN 'YES' WHEN wrong_label = 2  THEN 'MAYBE' ELSE 'NO' END, count(*) as count from evaluation group by wrong_label;", nativeQuery = true)
    List<Map<String,Object>> getLabelStatusCounts();

    @Query(value = "select atypical, count(*) as count from evaluation group by atypical;", nativeQuery = true)
    List<Map<String,Object>> getAtypicalCounts();

    @Query(value = "select label, count(*) as count from evaluation group by label;", nativeQuery = true)
    List<Map<String,Object>> getLabelCounts();
}
