import Cockatiel from './Cockatiel';
import _ from 'lodash';

export default class Pair {
  male: Cockatiel;
  female: Cockatiel;

  constructor(female: Cockatiel, male: Cockatiel) {
    this.male = male;
    this.female = female;
  }

  get recombineMethods() {
    return {
      recessive: (gene1: string, gene2: string) => {
        if (gene1 === gene2 && gene1[0] === gene1[1]) {
          const results: Record<string, number> = {};
          results[gene1] = 1;
          return results;
        }
        const geneSplit1 = gene1.split('');
        const geneSplit2 = gene2.split('');
        const results: Record<string, number> = {};

        for (const singleGene1 of geneSplit1) {
          const gene1Int = parseInt(singleGene1, 10);
          for (const singleGene2 of geneSplit2) {
            const gene2Int = parseInt(singleGene2, 10);
            const combination = [gene1Int, gene2Int]
              .sort((a, b) => b - a)
              .join('');
            if (results[combination]) {
              results[combination] += 1;
            } else {
              results[combination] = 1;
            }
          }
        }
        console.log('recessive', results);
        return results;
      },
      'sex-linked': () => {
        const crossoverArrayFemale: Record<string, string>[] = [];
        const strictArrayFemale: Record<string, string>[] = [];
        const crossoverArrayMale: Record<string, string>[] = [];
        const strictArrayMale: Record<string, string>[] = [];
        const maleChromosomes = this.male.sexChromosomes;
        const femaleChromosomes = this.female.sexChromosomes;
        const results = {
          male: { strict: strictArrayMale, crossover: crossoverArrayMale },
          female: {
            strict: strictArrayFemale,
            crossover: crossoverArrayFemale,
          },
        };
        if (maleChromosomes.chromosome1 === maleChromosomes.chromosome2) {
          results.male.strict.push({
            x1: maleChromosomes.chromosome1,
            x2: femaleChromosomes.chromosome1,
          });
          results.female.strict.push({
            x1: maleChromosomes.chromosome1,
            y: femaleChromosomes.chromosome2,
          });
        } else {
          results.male.strict.push(
            {
              x1: maleChromosomes.chromosome1,
              x2: femaleChromosomes.chromosome1,
            },
            {
              x1: maleChromosomes.chromosome2,
              x2: femaleChromosomes.chromosome1,
            },
          );
          results.female.strict.push(
            {
              x1: maleChromosomes.chromosome1,
              y: femaleChromosomes.chromosome2,
            },
            {
              x1: maleChromosomes.chromosome2,
              y: femaleChromosomes.chromosome2,
            },
          );
        }
        const parsedStrictResults = {
          male: results.male.strict,
          female: results.female.strict,
        };
        return parsedStrictResults;
      },
    };
  }

  updateChickArray(
    chickArray: Cockatiel[],
    gene: string,
    results: Record<string, number>,
  ): Cockatiel[] {
    const allTempArrays: Cockatiel[] = [];
    for (const chick of chickArray) {
      const tempChicks = [];
      for (const geneCombo in results) {
        const deepCopyChick = _.cloneDeep(chick);
        deepCopyChick.genotype[gene].genePair = geneCombo;

        tempChicks.push(deepCopyChick);
      }
      allTempArrays.push(...tempChicks);
    }
    return allTempArrays;
  }

  breed() {
    let femaleChicks: Cockatiel[] = [new Cockatiel('female')];
    let maleChicks: Cockatiel[] = [new Cockatiel('male')];

    for (const gene of Object.keys(Cockatiel.allMutations)) {
      const genePairFemale = this.female.genotype[gene].genePair;
      const genePairMale = this.male.genotype[gene].genePair;
      const inheritanceMode = this.female.genotype[gene].inheritanceMode;
      let results: Record<string, number>;
      if (
        inheritanceMode === 'parblue' ||
        inheritanceMode === 'dominant' ||
        inheritanceMode === 'recessive'
      ) {
        results = this.recombineMethods['recessive'](
          genePairFemale,
          genePairMale,
        );

        if (Object.keys(results).length === 1) {
          [maleChicks, femaleChicks].forEach((chickArray) => {
            for (const chick of chickArray) {
              chick.genotype[gene].genePair = Object.keys(results)[0];
            }
          });
        } else {
          maleChicks = this.updateChickArray(maleChicks, gene, results);
          femaleChicks = this.updateChickArray(femaleChicks, gene, results);
        }
      } else if (inheritanceMode === 'sex-linked') {
        const strictResults = this.recombineMethods[inheritanceMode]();

        strictResults.male.forEach((maleResult) => {
          maleChicks.forEach((maleChick) => {
            maleChick.convertSexChromosomesToGenePairs(
              maleResult.x1,
              maleResult.x2,
            );
          });
        });
        strictResults.female.forEach((femaleResult) => {
          femaleChicks.forEach((femaleChick) => {
            femaleChick.convertSexChromosomesToGenePairs(
              femaleResult.x1,
              femaleResult.y,
            );
          });
        });
      }
    }
    return { femaleChicks, maleChicks };
  }
}
