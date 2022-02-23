package com.gis.optimizer.evaluator;

import com.gis.database.model.Municipality;
import com.gis.optimizer.OptimizationEngine;
import com.gis.optimizer.model.BasicGenome;
import com.google.common.collect.Table;
import org.slf4j.LoggerFactory;
import org.uncommons.watchmaker.framework.FitnessEvaluator;

import java.util.List;
import java.util.logging.Logger;

public class SolutionEvaluator implements FitnessEvaluator<List<BasicGenome>> {

    private final Table distanceMatrix;
    private final List<Municipality> municipalities;
    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(SolutionEvaluator.class);

    public SolutionEvaluator(List<Municipality> municipalities, Table distanceMatrix) {
        this.distanceMatrix = distanceMatrix;
        this.municipalities = municipalities;
    }


    @Override
    public double getFitness(List<BasicGenome> basicGenomes, List<? extends List<BasicGenome>> list) {

        double totalCost = 0;
        try {
            for (Municipality municipality : municipalities) {
                Long demandWeight = municipality.getWeight();
                Double distanceCost = getNearestFacilityDistance(basicGenomes, municipality.getMunId());
                if (demandWeight != null && distanceCost != null)
                    totalCost += demandWeight * distanceCost;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            LOGGER.error(ex.toString());
        }
        /*try {
            for (BasicGenome genome : basicGenomes) {
                Long demandWeight = genome.getWeight();
                Long distanceCost = (Long) distanceMatrix.get(genome.getDemandID(), genome.getFacilityID());
                if (demandWeight != null && distanceCost != null)
                    totalCost += demandWeight * distanceCost;
            }
        } catch (Exception ex) {
            LOGGER.error(ex.toString());
        }*/
        return totalCost;
    }


    private Double getNearestFacilityDistance(List<BasicGenome> chromosome, String demandID) {

        Double minCost = Double.MAX_VALUE;
        for (BasicGenome genome : chromosome) {
            List<Double> travelTimes = (List<Double>) distanceMatrix.get(demandID, genome.getFacilityID());
            if(travelTimes!= null && travelTimes.size() > 0) {
                for (Double travelTime : travelTimes) {
                    if (travelTime == null) {
                        minCost = 0.0;
                    } else if (travelTime < minCost) {
                        minCost = travelTime;
                    }
                }
            }else
                minCost = 0.0;
        }

        return minCost;
    }


    @Override
    public boolean isNatural() {
        return false;
    }


    public static double cosine_similarity(Double[] vec1, Double[] vec2) {
        double cosim = vector_dot(vec1, vec2) / (vector_norm(vec1) * vector_norm(vec2));
        return cosim;
    }

    public static double vector_dot(Double[] vec1, Double[] vec2) {
        double sum = 0;
        for (int i = 0; i < vec1.length && i < vec2.length; i++)
            sum += vec1[i] * vec2[i];
        return sum;
    }

    public static double vector_norm(Double[] vec) {
        double sum = 0;
        for (double v : vec)
            sum += v * v;
        return Math.sqrt(sum);
    }
}
