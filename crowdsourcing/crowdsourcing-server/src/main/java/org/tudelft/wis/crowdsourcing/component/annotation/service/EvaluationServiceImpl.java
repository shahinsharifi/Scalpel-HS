package org.tudelft.wis.crowdsourcing.component.annotation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.AnnotationDao;
import org.tudelft.wis.crowdsourcing.component.annotation.dao.EvaluationDao;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Annotation;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Evaluation;

import java.util.List;
import java.util.Map;


@Service("evaluationManager")
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationDao evaluationDao;

    @Override
    public boolean insert(Evaluation evaluation) {
        evaluationDao.save(evaluation);
        return true;
    }

    @Override
    public Integer getTotalEvaluations() {
        return evaluationDao.getTotalEvaluations();
    }

    @Override
    public List<Map<String, Object>> getLabelStatusCounts() {
        return evaluationDao.getLabelStatusCounts();
    }

    @Override
    public List<Map<String, Object>> getAtypicalCounts() {
        return evaluationDao.getAtypicalCounts();
    }

    @Override
    public List<Map<String, Object>> getLabelCounts() {
        return evaluationDao.getLabelCounts();
    }
}
