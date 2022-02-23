package com.gis.database.service.feature;


import com.gis.database.dao.dmatrix.DmatrixDao;
import com.gis.database.dao.feature.FeatureDao;
import com.gis.database.model.Dmatrix;
import com.gis.database.model.Feature;
import com.gis.database.service.dmatrix.DmatrixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class FeatureServiceImpl implements FeatureService {

    @Autowired
    private FeatureDao featureDao;


    @Override
    public List<Feature> getAll() {
        return featureDao.findAllFeatures();
    }

}
