package com.gis.optimizer.operation;

import com.gis.database.model.Municipality;
import com.gis.optimizer.model.BasicGenome;
import com.google.common.collect.Table;
import org.uncommons.maths.number.NumberGenerator;
import org.uncommons.maths.random.Probability;
import org.uncommons.watchmaker.framework.EvolutionaryOperator;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


public class DemandMutation implements EvolutionaryOperator<BasicGenome> {

    private final NumberGenerator<Double> mutationAmount;
    private final NumberGenerator<Probability> mutationProbability;
    private final List<Municipality> municipalities;
    private final Table dMatrix;


    public DemandMutation(NumberGenerator<Probability> mutationProbability, NumberGenerator<Double> mutationAmount,
                          List<Municipality> municipalities, Table dMatrix) {

        this.mutationProbability = mutationProbability;
        this.mutationAmount = mutationAmount;
        this.municipalities = municipalities;
        this.dMatrix = dMatrix;
    }


    @Override
    public List<BasicGenome> apply(List<BasicGenome> chromosome, Random random) {

        List<BasicGenome> result = new ArrayList<>();

        //Calculating available facilities in this chromosome
        List<String> facilities = getAvailableFacilities(chromosome);

        for (BasicGenome genome : chromosome) {
            if (mutationProbability.nextValue().nextEvent(random)) {
                result.add(mutateGenome(genome, facilities, random));
            } else {
                result.add(genome);
            }
        }

        return result;
    }


    private BasicGenome mutateGenome(BasicGenome chromosome, List<String> facilities, Random rng) {

        int randomNumber = rng.nextInt(facilities.size());
        String candidate = facilities.get(randomNumber);
        chromosome.setFacilityID(candidate);
        return chromosome;
    }


    private List<String> getAvailableFacilities(List<BasicGenome> chromosome) {

        List<String> facilities = new ArrayList<>();
        for (BasicGenome genome : chromosome) {
            if (!facilities.contains(genome.getFacilityID()))
                facilities.add(genome.getFacilityID());
        }
        return facilities;
    }

}
