import React, { useState } from 'react';
import './Radiogroup.scss';
import Gene from '../lib/Gene';

export interface Props {
  gene: Gene;
  gender: string;
  setGeneFunction: (type: string, gene: string) => void;
}

function Radiogroup(props: Props) {
  const { gene, gender, setGeneFunction } = props;
  const [checkedValue, setCheckedValue] = useState(gene.genePair);
  const [singleGenes, setSingleGenes] = useState(gene.genePair.split(''));

  function handleParblueClick(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const geneArray = [...singleGenes];
    const button = e.currentTarget as HTMLInputElement;
    geneArray[index] = button.value;
    if (geneArray[1] < geneArray[0]) {
      geneArray[1] = geneArray[0];
    }
    setGeneFunction('parblue', geneArray.join(''));
    setSingleGenes([...geneArray]);
  }

  function handleInputClick(e: React.ChangeEvent<HTMLInputElement>) {
    setGeneFunction(
      gene.names[0].replace(' ', '-').toLowerCase(),
      (e.currentTarget as HTMLInputElement).value,
    );
    setCheckedValue((e.currentTarget as HTMLInputElement).value);
  }

  switch (gene.inheritanceMode) {
    case 'recessive': {
      return (
        <li>
          <h2>{gene.names}</h2>
          <div role='radiogroup' className='radiogroup-container'>
            <input
              type='radio'
              id={`visual-button-${gene.names[0]}`}
              value='11'
              onChange={handleInputClick}
              checked={checkedValue === '11'}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[0]}`}>Visual</label>
            <input
              type='radio'
              id={`split-button-${gene.names[0]}`}
              value='10'
              onChange={handleInputClick}
              checked={checkedValue === '10'}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`split-button-${gene.names[0]}`}>Split</label>

            <input
              type='radio'
              id={`none-button-${gene.names[0]}`}
              value='00'
              onChange={handleInputClick}
              checked={checkedValue === '00'}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`none-button-${gene.names[0]}`}>None</label>
          </div>
        </li>
      );
    }
    case 'sex-linked': {
      return (
        <li>
          <h2>{gene.names}</h2>
          <div role='radiogroup' className='radiogroup-container'>
            <input
              type='radio'
              id={`visual-button-${gene.names[0]}`}
              value={gender === 'female' ? '1Y' : '11'}
              onChange={handleInputClick}
              checked={checkedValue === '1Y' || checkedValue === '11'}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[0]}`}>Visual</label>
            {gender === 'male' ? (
              <>
                <input
                  type='radio'
                  id={`splitX1-button-${gene.names[0]}`}
                  value='10'
                  onChange={handleInputClick}
                  checked={checkedValue === '10'}
                  name={`radiogroup-${gene.names[0]}`}
                ></input>
                <label htmlFor={`splitX1-button-${gene.names[0]}`}>
                  Split (X1)
                </label>
                <input
                  type='radio'
                  id={`splitX2-button-${gene.names[0]}`}
                  value='01'
                  onChange={handleInputClick}
                  checked={checkedValue === '01'}
                  name={`radiogroup-${gene.names[0]}`}
                ></input>
                <label htmlFor={`splitX2-button-${gene.names[0]}`}>
                  Split (X2)
                </label>
              </>
            ) : (
              ''
            )}
            <input
              type='radio'
              id={`none-button-${gene.names[0]}`}
              value={gender === 'female' ? '0Y' : '00'}
              checked={checkedValue === '0Y' || checkedValue === '00'}
              onChange={handleInputClick}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`none-button-${gene.names[0]}`}>None</label>
          </div>
        </li>
      );
    }
    case 'parblue': {
      return (
        <li>
          <h2>Parblue (Pastelface, Creamface, Whiteface)</h2>
          <p>Gene 1 (phenotype)</p>
          <div role='radiogroup' className='radiogroup-container'>
            <input
              type='radio'
              id={`none-button`}
              value='0'
              onChange={(e) => handleParblueClick(e, 0)}
              checked={singleGenes[0] === '0'}
              name={`radiogroup-parblue1`}
            ></input>
            <label htmlFor={`none-button`}>None</label>
            <input
              type='radio'
              id={`visual-button-${gene.names[0]}`}
              value='1'
              onChange={(e) => handleParblueClick(e, 0)}
              checked={singleGenes[0] === '1'}
              name={`radiogroup-parblue1`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[0]}`}>PF</label>
            <input
              type='radio'
              id={`visual-button-${gene.names[1]}`}
              value='2'
              onChange={(e) => handleParblueClick(e, 0)}
              checked={singleGenes[0] === '2'}
              name={`radiogroup-parblue1`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[1]}`}>CF</label>
            <input
              type='radio'
              id={`visual-button-${gene.names[2]}`}
              value='3'
              onChange={(e) => handleParblueClick(e, 0)}
              checked={singleGenes[0] === '3'}
              name={`radiogroup-parblue1`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[2]}`}>WF</label>
          </div>
          <p>Gene 2</p>
          <div role='radiogroup' className='radiogroup-container'>
            <input
              type='radio'
              id={`none-button2`}
              value='0'
              onChange={(e) => handleParblueClick(e, 1)}
              checked={singleGenes[1] === '0'}
              disabled={parseInt(singleGenes[0], 10) > 0}
              name={`radiogroup-parblue2`}
            ></input>
            <label htmlFor={`none-button2`}>None</label>
            <input
              type='radio'
              id={`visual-button-${gene.names[0]}2`}
              value='1'
              onChange={(e) => handleParblueClick(e, 1)}
              checked={singleGenes[1] === '1'}
              disabled={parseInt(singleGenes[0], 10) > 1}
              name={`radiogroup-parblue2`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[0]}2`}>PF</label>
            <input
              type='radio'
              id={`visual-button-${gene.names[1]}2`}
              value='2'
              onChange={(e) => handleParblueClick(e, 1)}
              checked={singleGenes[1] === '2'}
              disabled={parseInt(singleGenes[0], 10) > 2}
              name={`radiogroup-parblue2`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[1]}2`}>CF</label>
            <input
              type='radio'
              id={`visual-button-${gene.names[2]}2`}
              value='3'
              onChange={(e) => handleParblueClick(e, 1)}
              checked={singleGenes[1] === '3'}
              name={`radiogroup-parblue2`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[2]}2`}>WF</label>
          </div>
        </li>
      );
    }
    case 'dominant': {
      return (
        <li>
          <h2>{gene.names}</h2>
          <div role='radiogroup' className='radiogroup-container'>
            <input
              type='radio'
              id={`visual-button-${gene.names[0]}`}
              value='11'
              onChange={handleInputClick}
              checked={checkedValue === '11'}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`visual-button-${gene.names[0]}`}>
              Double Factor
            </label>
            <input
              type='radio'
              id={`split-button-${gene.names[0]}`}
              value='10'
              onChange={handleInputClick}
              checked={checkedValue === '10'}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`split-button-${gene.names[0]}`}>
              Single Factor
            </label>

            <input
              type='radio'
              id={`none-button-${gene.names[0]}`}
              value='00'
              onChange={handleInputClick}
              checked={checkedValue === '00'}
              name={`radiogroup-${gene.names[0]}`}
            ></input>
            <label htmlFor={`none-button-${gene.names[0]}`}>None</label>
          </div>
        </li>
      );
    }
    default: {
      return '';
    }
  }
}

export default Radiogroup;
