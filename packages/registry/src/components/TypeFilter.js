import React, { useState, useEffect } from 'react';

export function TypeFilter({ nominees, displayNominees, setDisplayNominees }) {
  const types = ["aimodel", "content", "data", "software", "standard"]
  const displayTypes = ["AI Model", "Content", "Data", "Software", "Standard"]

  const [checkedState, setCheckedState] = useState(types);

  useEffect(() => setDisplayNominees(filteredNominees), [checkedState]);

  function determineValue(item, index) {
    if (item === false) {
      return types[index]
    } else {
      return false
    }
  }

  const filteredNominees = nominees.filter(nominee => {
    const filteredCheckState = checkedState.filter(Boolean)
    function passesSdg() {
      // find if the arrays have any elements in common
      return filteredCheckState.filter(value => nominee.type.includes(value)).length > 0;
    }
    return passesSdg();

  })

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? determineValue(item, index) : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="filterSection">
      <div className="filterHead">
        <div className="filterSectionTitle">
          <p className="filter_header">SDG</p>
          {/* <div className="icon" onClick={this.toggleVisible} id="sdg-toggle"> */}
          <div className="icon" id="sdg-toggle">
            <svg viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.35">
              <path d="M7 1.053L4.027 4 1 1" stroke="currentColor" fill="none"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="filteredContent" id="sdg-options">

        <ul className="types-list">
          {displayTypes.map((name, index) => {
            return (
              <li key={index}>
                <div className="types-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-type-checkbox-${index}`}
                      name={name}
                      value={index}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}