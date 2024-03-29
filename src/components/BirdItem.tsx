import BirdIcon from './BirdIcon';
import Cockatiel from '../lib/Cockatiel';
import './BirdItem.scss';

export interface Props {
  bird: Cockatiel;
  handleEditButtonClick: (bird: Cockatiel) => void;
  isEditable: boolean;
}

function BirdItem(props: Props) {
  return (
    <li>
      <div className='list-top-row'>
        <span>
          {props.bird.prefix || props.bird.frequencyAsPercentage}
          {props.bird.genotypeInWords.genotype}
        </span>
        {props.isEditable && (
          <button
            type='button'
            className='open-form-button'
            onClick={() => props.handleEditButtonClick(props.bird)}
          >
            Change
          </button>
        )}
      </div>
      <BirdIcon mutations={props.bird.genotypeInWords.classes} />
    </li>
  );
}

export default BirdItem;
