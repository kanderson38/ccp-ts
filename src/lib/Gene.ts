export default class Gene {
  names: string[];
  inheritanceMode: string;
  _genePair!: string;

  constructor(names: string[], inheritanceMode: string, isFemale = true) {
    this.names = names;
    this.inheritanceMode = inheritanceMode;
    this.genePair = isFemale && inheritanceMode === 'sex-linked' ? '0Y' : '00';
  }

  get genePair() {
    return this._genePair;
  }

  set genePair(newValue) {
    this._genePair = newValue;
  }

  get splitsAndVisuals() {
    const splits: string[] = [];
    const visuals: string[] = [];
    const classes: string[] = [];

    const genes = this.genePair.split('');
    if (this.inheritanceMode === 'dominant') {
      let descriptiveText = '';
      if (genes[0] === genes[1] && genes[0] !== '0') {
        descriptiveText = `${this.displayName(0)} (double factor)`;
      } else if (genes[0] !== genes[1]) {
        descriptiveText = `${this.displayName(0)} (single factor)`;
      }
      descriptiveText && visuals.push(descriptiveText);
      descriptiveText &&
        classes.push(this.displayName(0).replace(' ', '-').toLowerCase());
    } else if (genes[0] !== genes[1] && genes[1] !== 'Y') {
      genes.forEach((gene) => {
        if (gene !== '0') {
          splits.push(this.displayName(parseInt(gene, 10) - 1));
          if (this.inheritanceMode === 'parblue') {
            classes.push(
              this.displayName(parseInt(gene, 10) - 1)
                .replace(' ', '-')
                .toLowerCase(),
            );
          }
        }
      });
    } else if (
      (genes[0] !== '0' && genes[0] === genes[1]) ||
      (genes[0] !== '0' && genes[1] === 'Y')
    ) {
      const visualName = this.displayName(parseInt(genes[0]) - 1);
      visuals.push(visualName);
      classes.push(visualName.replace(' ', '-').toLowerCase());
    }
    return {
      splits: [...splits],
      visuals: [...visuals],
      classes: [...classes],
    };
  }

  displayName(index: number) {
    return this.names[index];
  }
}
