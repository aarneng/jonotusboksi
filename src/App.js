import myData from "./db.json"
import * as React from 'react';
import {useState, useEffect} from "react"
import "./App.css"

function App() {

  function timeToColor(p) {
    // B03B3B = long
    // AB6F39 0 medium
    // 84BB45 
    // p = Math.min(Math.max(p, 0), 1)
    // let r = Math.floor(p * 255).toString(16).padStart(2, "0"),
    //     g = Math.floor((1-p) * 255).toString(16).padStart(2, "0"),
    //     b = "00";
    // return "#" + r + g + b

    if (p < 6) return "#84BB45"
    if (p < 10) return "#FF7C35"
    return "#FF3E35"
  }

  function generateRandomTime(min, max) {
    let interval = max - min
    return Math.floor(Math.random() * interval) + min
  }

  function mapBDEntryToLI(entry) {
    let maxTime = 20  // anything that is >= this number will show up as red
    let time = entry.currentTime
    let pTime = time / maxTime
    let innerText = [
        <h2>{
          `Ravintola ${entry.name}:`
        }</h2>,
          <div className="square">
            <div>
              <div className="big-text">
                {time}
              </div>
              minuuttia
            </div>
          </div>
    ]
    return <li style={{backgroundColor: timeToColor(time)}} key={Math.random()*1e9}>
       {innerText}
    </li>
  }

  const [data, setData] = useState([])
  const [listItems, setListItems] = useState([])
  
  useEffect(() => {
    let arrData = Object.values(myData)
    arrData.map(o => o.currentTime = generateRandomTime(o.minTime, o.maxTime))
    setData(arrData)
    setListItems(arrData.map(d => mapBDEntryToLI(d)))
  }, [])
  
  const handleDefaultSort = () => {
    setListItems(data.map(d => mapBDEntryToLI(d)))
  };

  const handleFromSmallestSort = () => {
    let sortedCpy = [...data]  // copy of the array
    sortedCpy.sort((a, b) => a.currentTime - b.currentTime)
    setListItems(sortedCpy.map(d => mapBDEntryToLI(d)))
  };

  return (
    <div>
      <h1>
        Jonotilanne:
      </h1>
      <Dropdown
        trigger={<button>Järjestä ravintolat</button>}
        menu={[
          <button onClick={handleDefaultSort}>Suosituin ensin</button>,
          <button onClick={handleFromSmallestSort}>Lyhyin jonotusaika ensin</button>,
        ]}
      />
      <ul>
        {listItems}
        {/* {data} */}
      </ul>
    </div>
  );
}

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ol className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
};

export default App;
