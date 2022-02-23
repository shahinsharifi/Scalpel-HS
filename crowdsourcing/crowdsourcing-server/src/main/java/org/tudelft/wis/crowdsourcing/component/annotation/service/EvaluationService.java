package org.tudelft.wis.crowdsourcing.component.annotation.service;
import org.springframework.data.jpa.repository.Query;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Annotation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Evaluation;

import java.util.List;
import java.util.Map;

public interface EvaluationService {
    public boolean insert(Evaluation evaluation);
    Integer getTotalEvaluations();
    List<Map<String,Object>> getLabelStatusCounts();
    List<Map<String,Object>> getAtypicalCounts();
    List<Map<String,Object>> getLabelCounts();
}
