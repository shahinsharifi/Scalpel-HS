package com.gis.optimizer.operation;

import com.gis.database.model.Dmatrix;
import com.gis.database.model.Municipality;
import com.gis.optimizer.model.BasicGenome;
import com.google.common.collect.Table;
import org.uncommons.maths.number.NumberGenerator;
import org.uncommons.maths.random.Probability;
import org.uncommons.watchmaker.framework.EvolutionaryOperator;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


public class FacilityMutation implements EvolutionaryOperator<BasicGenome> {

    private final NumberGenerator<Double> mutationAmount;
    private final NumberGenerator<Probability> mutationProbability;
    private final List<Municipality> municipalities;
    private final Table dMatrix;


    public FacilityMutation(NumberGenerator<Probability> mutationProbability, NumberGenerator<Double> mutationAmount,
                            List<Municipality> municipalities, Table dMatrix) {

        this.mutationProbability = mutationProbability;
        this.mutationAmount = mutationAmount;
        this.municipalities = municipalities;
        this.dMatrix = dMatrix;
    }



    @Override
    public List<BasicGenome> apply(List<BasicGenome> chromosome, Random random) {

        //  List<BasicGenome> result = new ArrayList<>();

        for (BasicGenome genome : chromosome) {
            if (mutationProbability.nextValue().nextEvent(random)) {
                Double beforeCost = calculateTotalCost(chromosome);
                //result.add(mutateGenome(chromosome, genome, random));
                String beforeFid = genome.getFacilityID();
                String afterFid = mutateGenome(chromosome, genome, random).getFacilityID();
                genome.setFacilityID(afterFid);
                Double afterCost = calculateTotalCost(chromosome);
                if (afterCost > beforeCost)
                    genome.setFacilityID(beforeFid);
            }
        }

        return chromosome;
    }


    private BasicGenome mutateGenome(List<BasicGenome> chromosome, BasicGenome gene, Random rng) {

        int randomNumber = rng.nextInt(municipalities.size());
        String candidate = municipalities.get(randomNumber).getMunId();
        BasicGenome testGenome = new BasicGenome(candidate);
        if(!chromosome.contains(testGenome))
            gene.setFacilityID(candidate);

        return gene;
    }




    private Double calculateTotalCost(List<BasicGenome> chromosome) {

        Double totalCost = 0.0;
        for(Municipality municipality: municipalities) {
            Double minCost = Double.MAX_VALUE;
            for (BasicGenome genome : chromosome) {
                List<Double> travelTimes = (List<Double>) dMatrix.get(municipality.getMunId(), genome.getFacilityID());
                if(travelTimes != null && travelTimes.size() > 0) {
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
            totalCost += minCost * municipality.getWeight();
        }

        return totalCost;
    }

}
