package com.gis.database.dao.feature;



import com.gis.database.model.Dmatrix;
import com.gis.database.model.Feature;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FeatureDao extends CrudRepository<Feature, Long> {
    @Query(value = "SELECT *  FROM features;", nativeQuery = true)
    List<Feature> findAllFeatures();
}
