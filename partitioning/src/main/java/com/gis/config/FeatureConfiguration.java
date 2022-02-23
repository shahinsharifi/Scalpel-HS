package com.gis.config;

import com.gis.database.model.Dmatrix;
import com.gis.database.model.Feature;
import com.gis.database.service.dmatrix.DmatrixServiceImpl;
import com.gis.database.service.feature.FeatureServiceImpl;
import com.gis.optimizer.math.Statistics;
import com.google.common.collect.HashBasedTable;
import com.google.common.collect.Table;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

import java.util.ArrayList;
import java.util.List;

@Configuration
@PropertySources(value = {@PropertySource("classpath:/application.properties")})
public class FeatureConfiguration {

    @Autowired
    private FeatureServiceImpl featureService;

    private static final Logger LOGGER = LoggerFactory.getLogger(DmatrixConfiguration.class);

    private final static Table<String, String, List<Double>> featureMatrix = HashBasedTable.create();


    @Bean
    public boolean initFeatureMatrix() {

        List<Feature> fmatrix = featureService.getAll();
        LOGGER.info("Distances are loaded...");

        List<Double> sDeviations = new ArrayList<>();

        LOGGER.info("Start initializing distance table...");
        for(Feature feature: fmatrix) {
            featureMatrix.put(feature.getImageName(), "", feature.getEmbedding());
        }
        LOGGER.info("Distance table is initialized...");


        LOGGER.info("Destroying the initial distance matrix...");
        fmatrix.clear();

        return true;
    }

    public static Table getFeatureMatrix(){
        return featureMatrix;
    }

}
