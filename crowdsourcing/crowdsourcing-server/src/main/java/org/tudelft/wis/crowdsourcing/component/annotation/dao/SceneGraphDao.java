package org.tudelft.wis.crowdsourcing.component.annotation.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;
import org.tudelft.wis.crowdsourcing.component.annotation.model.SceneGraph;

import javax.transaction.Transactional;
import java.util.List;


@Transactional
public interface SceneGraphDao extends CrudRepository<SceneGraph, Integer> {

    public List<SceneGraph> findAllByImageNameEqualsAndObject1ScoreGreaterThanEqualAndObject2ScoreGreaterThanEqual(String imageName, double score1, double score2);

    public List<SceneGraph> findTop25ByImageNameEqualsAndObject1ScoreGreaterThanEqualAndObject2ScoreGreaterThanEqualOrderByRelationScoreDesc(String imageName, double score1, double score2);

    public List<SceneGraph> findTop30ByImageNameEqualsOrderByRelationScoreDesc(String imageName);

}
