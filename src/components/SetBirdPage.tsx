import Radiogroup from './Radiogroup';
import './SetBirdPage.scss';
import Cockatiel from '../lib/Cockatiel';

export interface Props {
  bird: Cockatiel;
  setFunction: (bird: Cockatiel) => void;
  showFunction: (shouldShow: boolean) => void;
  open: boolean;
}

function SetBirdPage(props: Props) {
  const { bird, setFunction, showFunction, open } = { ...props };
  function setGeneFunction(name: string, value: string) {
    const gene = bird.genotype[name];

    gene.genePair = value;
    setFunction(bird);
  }

  const radiogroups = Object.keys(bird.genotype).map((key) => {
    return (
      <Radiogroup
        key={key}
        setGeneFunction={setGeneFunction}
        gene={bird.genotype[key]}
        gender={bird.gender}
      />
    );
  });

  return (
    open && (
      <div className={`set-bird-page`}>
        <p className='description'>Set {bird.gender}'s type</p>

        <div>
          <ul>{radiogroups}</ul>
        </div>
        <button
          onClick={() => {
            showFunction(false);
          }}
        >
          Save
        </button>
      </div>
    )
  );
}

export default SetBirdPage;
