import Gene from './Gene';

export default class Cockatiel {
  prefix: string;
  gender: string;
  genotype: Record<string, Gene>;
  frequency: number = 1;

  constructor(
    gender = 'female',
    prefix = '',
    genotype: Record<string, Gene> | null = null,
  ) {
    this.prefix = prefix;
    this.gender = gender;
    this.genotype = genotype || Cockatiel.createGenotype(this.gender);
  }

  static createGenotype(gender: string): Record<string, Gene> {
    const genotype: Record<string, Gene> = {};
    const allMutations = Cockatiel.allMutations;
    for (const key of Object.keys(allMutations)) {
      genotype[key] = new Gene(
        allMutations[key].names,
        allMutations[key].inheritance,
        gender === 'female',
      );
    }
    return genotype;
  }

  static get allSexLinkedMutations() {
    return ['cinnamon', 'pearl', 'lutino', 'sex-linked-yellowcheek'];
  }

  get sexChromosomes() {
    const chromosome1Array = [];
    const chromosome2Array = [];
    for (const mutation of Cockatiel.allSexLinkedMutations) {
      chromosome1Array.push(this.genotype[mutation].genePair[0]);
      chromosome2Array.push(this.genotype[mutation].genePair[1]);
    }
    const chromosome1 = chromosome1Array.join('');
    const chromosome2 = chromosome2Array.join('');
    return { chromosome1, chromosome2 };
  }

  get genotypeInWords() {
    const splitsArray = [];
    const visualsArray = [];
    const classes: string[] = [];
    for (const gene in this.genotype) {
      const results = this.genotype[gene].splitsAndVisuals;
      if (results.splits.length) {
        for (const split of results.splits) {
          splitsArray.push(split);
        }
        if (gene === 'parblue') {
          for (const className of results.classes) {
            classes.push(className);
          }
        }
      }
      if (results.visuals.length) {
        visualsArray.push([...results.visuals]);
        for (const classString of results.classes) {
          classes.push(classString);
        }
      }
    }
    if (!visualsArray.length) {
      visualsArray.push('Normal grey');
    }
    return {
      genotype: `${visualsArray.join(' ')} ${
        splitsArray.length ? 'split to' : ''
      } ${splitsArray.join(' ')}`,
      classes,
    };
  }

  convertSexChromosomesToGenePairs = (
    chromosome1: string,
    chromosome2: string,
  ) => {
    chromosome1.split('').forEach((gene, index) => {
      const genePair = gene + chromosome2[index];
      const genesInOrder = Cockatiel.allSexLinkedMutations;
      this.genotype[genesInOrder[index]].genePair = genePair;
    });
  };

  static get allMutations(): Record<
    string,
    { names: string[]; inheritance: string }
  > {
    return {
      cinnamon: {
        names: ['Cinnamon'],
        inheritance: 'sex-linked',
      },
      pearl: {
        names: ['Pearl'],
        inheritance: 'sex-linked',
      },
      lutino: {
        names: ['Lutino'],
        inheritance: 'sex-linked',
      },
      'sex-linked-yellowcheek': {
        names: ['Sex-linked yellowcheek'],
        inheritance: 'sex-linked',
      },
      pied: {
        names: ['Pied'],
        inheritance: 'recessive',
      },
      fallow: {
        names: ['Fallow'],
        inheritance: 'recessive',
      },
      olive: {
        names: ['Olive'],
        inheritance: 'recessive',
      },
      'recessive-silver': {
        names: ['Recessive silver'],
        inheritance: 'recessive',
      },
      parblue: {
        names: ['Pastelface', 'Creamface', 'Whiteface'],
        inheritance: 'parblue',
      },
      'dominant-silver': {
        names: ['Dominant silver'],
        inheritance: 'dominant',
      },
      'dominant-yellowcheek': {
        names: ['Dominant yellowcheek'],
        inheritance: 'dominant',
      },
    };
  }
}
