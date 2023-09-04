import './BirdList.scss';
import BirdItem from './BirdItem';
import Cockatiel from '../lib/Cockatiel';

export interface birdsAndActionsObj {
  bird: Cockatiel;
  buttonAction: (bird: Cockatiel) => void;
}

export interface Props {
  birdsAndActions: birdsAndActionsObj[];
  headerText: string;
}

function BirdList(props: Props) {
  function parentsItems() {
    const birdsList = props.birdsAndActions.map((item, index) => {
      return (
        <BirdItem
          bird={item.bird}
          key={index}
          handleEditButtonClick={item.buttonAction}
        />
      );
    });
    return (
      <>
        <div className='header'>
          <h2 className='listHeader'>{props.headerText}</h2>
        </div>
        <ul>{birdsList}</ul>
      </>
    );
  }
  return (
    <div id='birdlist'>
      <ul>{parentsItems()}</ul>
      {/* <ul>
          {chicksItems()}
        </ul> */}
    </div>
  );
}

export default BirdList;
