package org.tudelft.wis.crowdsourcing.component.annotation.service;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Annotation;

import java.util.List;

public interface AnnotationService {
    public boolean insertAll(List<Annotation> annotations);

    public List<Annotation> getAnnotationsBySessionId(Integer sessionId);
}
