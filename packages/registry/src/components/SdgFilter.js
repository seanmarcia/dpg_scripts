import React, { useState, useEffect } from 'react';

export function SdgFilter({ nominees, displayNominees, setDisplayNominees }) {
  const sdgs = ["1. No Poverty", "2. Zero Hunger", "3. Good Health and Well-being", "4. Quality Education", "5. Gender Equality", "6. Clean Water and Sanitation", "7. Affordable and Clean Energy", "8. Decent Work and Economic Growth", "9. Industry, Innovation and Infrastructure", "10. Reduced Inequality", "11. Sustainable Cities and Communities", "12. Responsible Consumption and Production", "13. Climate Action", "14. Life Below Water", "15. Life on Land", "16. Peace and Justice Strong Institutions", "17. Partnerships to achieve the Goal"]

  
  const [checkedState, setCheckedState] = useState(
    Array.from({ length: sdgs.length }, (_, i) => i + 1)
  );

  useEffect(() => setDisplayNominees(filteredNominees), [checkedState]);

  function determineValue(item, index) {
    if (item === false) {
      return index + 1
    } else {
      return false
    }
  }

  const filteredNominees = nominees.filter(nominee => {
    const filteredCheckState = checkedState.filter(Boolean)
    function passesSdg() {
      const nomineeSdgArray = nominee.SDGs.map(item => item.SDGNumber);
      // find if the arrays have any elements in common
      return filteredCheckState.filter(value => nomineeSdgArray.includes(value)).length > 0;
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

        <ul className="sdgs-list">
          {sdgs.map((name, index) => {
            return (
              <li key={index}>
                <div className="sdgs-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
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