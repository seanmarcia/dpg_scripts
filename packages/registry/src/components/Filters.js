import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import nominees from '../nominees.json';

const sdg_labels = ["1. No Poverty","2. Zero Hunger","3. Good Health and Well-being","4. Quality Education","5. Gender Equality","6. Clean Water and Sanitation","7. Affordable and Clean Energy","8. Decent Work and Economic Growth","9. Industry, Innovation and Infrastructure","10. Reduced Inequality","11. Sustainable Cities and Communities","12. Responsible Consumption and Production","13. Climate Action","14. Life Below Water","15. Life on Land","16. Peace and Justice Strong Institutions","17. Partnerships to achieve the Goal"]
const types = {
  "aimodel": {
    name: "AI Model"
  },
  "content": {
    name: "Content"
  },
  "data": {
    name: "Data"
  },
  "software": {
    name: "Software"
  },
  "standard": {
    name: "Standard"
  }
};
const stage = ["nominee", "DPG"];
const sdgs = ["sdg1", "sdg2", "sdg3", "sdg4", "sdg5", "sdg6", "sdg7", "sdg8", "sdg9", "sdg10", "sdg11", "sdg12", "sdg13", "sdg14", "sdg15", "sdg16", "sdg17"];


function trunc(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

export class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, count: 0};
    this.handleChange = this.handleChange.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  handleChange(event) {
    let checkboxId
    let display;
    if(event){
      checkboxId = event.target.id.split('-')[0];
      display = event.target.checked;
    } else {
      // When the page loads, handleChange() is called via componentDidMount()
      // We only want to display DPGs at page load, so nominees is unchecked
      // and so we set these two variables accordinly to get the desired behavior
      checkboxId='nominee'
      display=false
    }

    var elems = document.getElementsByClassName(checkboxId);

    for(let i=0; i < elems.length; i++) {
      let concurrentClasses;
      if(display) {
        concurrentClasses = elems[i].className.trim().split(' ');
      } else {
        concurrentClasses = elems[i].className.trim().split(' ').filter(function(a){ return a !== checkboxId });
      }

      // ["class1", "class2", "class3", "content", "software"] => ["content", "software"]

      let intersectionSet1 = concurrentClasses.filter(i => Object.keys(types).includes(i));
      //const keys = ["aimodel", "content", "data", "software", "standard"]
      let intersectionSet2 = concurrentClasses.filter(i => sdgs.includes(i));
      let intersectionSet3 = concurrentClasses.filter(i => stage.includes(i));

      let intersection1 = false;
      //["content", "software"]
      for(let j=0; j < intersectionSet1.length; j++) {
        if(document.getElementById(intersectionSet1[j]+'-checkbox').checked){
          intersection1 = true;
          break;
        }
      }
      let intersection2 = false;
      for(let j=0; j < intersectionSet2.length; j++) {
        if(document.getElementById(intersectionSet2[j]+'-checkbox').checked){
          intersection2 = true;
          break;
        }
      }
      let intersection3 = false;
      for(let j=0; j < intersectionSet3.length; j++) {
        if(document.getElementById(intersectionSet3[j]+'-checkbox').checked){
          intersection3 = true;
          break;
        }
      }

      if (true) {
        elems[i].style.display = 'table-row';
      } else {
        elems[i].style.display = 'none';
      }
    }
    this.countActive();
  }

  toggleVisible(event) {
    let parent;
    if(event.target.nodeName === 'path') {
      parent = event.target.parentNode.parentNode;
    } else if (event.target.nodeName === 'svg') {
      parent = event.target.parentNode;
    } else {
      parent = event.target;
    }
    let splits = parent.id.split('-');
    if(parent.style.transform === ''){
      parent.style.transform = 'rotate(180deg)';
      document.getElementById(splits[0]+'-options').style.display='none';
    } else {
      parent.style.transform = '';
      document.getElementById(splits[0]+'-options').style.display='block';
    }
  }

  componentDidMount() {
    this.handleChange();
  }

  countActive() {
    const elems = document.getElementById('mytable').getElementsByTagName('tr');
    let count = 0;
    for(let i=0; i<elems.length; i++) {
      if(elems[i].style.display !== 'none'){
        count++;
      }
    }
    this.setState({count: count-1});
  }

  render() {
      return (
        <div>
          <div className="filterSection">
            <p>Displaying {this.state.count} of <b>{nominees.length}</b> items</p>
          </div>

          <div className="filterSection">
            <div className="filterSectionTitle">
               <p className="filter_header">status</p>
               <div className="icon" onClick={this.toggleVisible} id="type-toggle">
                <svg viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.35">
                  <path d="M7 1.053L4.027 4 1 1" stroke="currentColor" fill="none"></path>
                </svg>
               </div>
            </div>
            <div className="filteredContent" id="type-options">
                <Form>
                  {stage.map((label, index) => (
                  <Form.Check 
                    key={index}
                    type='checkbox'
                    id={`${label}-checkbox`}
                  >
                  {(label==='DPG')?
                    <Form.Check.Input type='checkbox' defaultChecked onChange = {this.handleChange}/>:
                    <Form.Check.Input type='checkbox' onChange = {this.handleChange}/>
                  }
                    <Form.Check.Label>
                      {(label==='DPG')?<span>digital public good <img src="dpgicon.svg" alt="DPG icon" height="30"/></span>:trunc(label,25)}
                      </Form.Check.Label>
                  </Form.Check>
                  ))}
                </Form>
            </div>
          </div>

          <div className="filterSection">
            <div className="filterSectionTitle">
               <p className="filter_header">type</p>
               <div className="icon" onClick={this.toggleVisible} id="type-toggle">
                <svg viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.35">
                  <path d="M7 1.053L4.027 4 1 1" stroke="currentColor" fill="none"></path>
                </svg>
               </div>
            </div>
            <div className="filteredContent" id="type-options">
                <Form>
                  {Object.keys(types).map((label, index) => (
                  <Form.Check 
                    key={index}
                    type='checkbox'
                    id={`${label}-checkbox`}
                    label={trunc(types[label]['name'],25)}
                    defaultChecked
                    // checked={index % 2 === 0}
                    onChange = {this.handleChange}
                  />
                  ))}
                </Form>
            </div>
          </div>

          <div className="filterSection">
            <div className="filterHead">
              <div className="filterSectionTitle">
               <p className="filter_header">SDG</p>
               <div className="icon" onClick={this.toggleVisible} id="sdg-toggle">
                <svg viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.35">
                  <path d="M7 1.053L4.027 4 1 1" stroke="currentColor" fill="none"></path>
                </svg>
               </div>
              </div>
            </div>
            <div className="filteredContent" id="sdg-options">
                <Form>
                  {sdg_labels.map((label, index) => (
                  <Form.Check 
                    key={index}
                    type='checkbox'
                    id={`sdg${index+1}-checkbox`}
                    label={trunc(label, 25)}
                    defaultChecked
                    onChange = {this.handleChange}
                  />
                  ))}
                </Form>
            </div>
        </div>
       
      </div>
        ); 
  }
}