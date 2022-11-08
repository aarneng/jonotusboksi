import myData from "./db.json"
import fakeMenu from "./fakeMenu.json"
//eslint-disable-next-line
import getMenu from "./services/getMenu"
import * as React from 'react';
import {useState, useEffect} from "react"
import "./App.css"

/*
 * 
 * run instructions: https://github.com/gitname/react-gh-pages
 * 
 * TL;DW: 
 * deploy: 
 * npm run deploy -- -m "Deploy React app to GitHub Pages"
 * 
 * commit (works as normal):
 * git add .
 * git commit -m "Configure React app for deployment to GitHub Pages"
 * git push origin master
 */

function App() {

  const [data, setData] = useState([])
  const [listItems, setListItems] = useState([])
  const [menuDB, setMenuDB] = useState([])
  
  useEffect(() => {
    // let menuData = Object.values(fakeMenu)
    setMenuDB(fakeMenu)
    let arrData = Object.values(myData)
    arrData.map(o => o.currentTimeInterval = generateRandomTime(o.minTime, o.maxTime))
    setData(arrData)
    setListItems(arrData.map(d => mapBDEntryToLI(d)))
    // getMenu().then(i => {setMenuDB(i); console.log(i);})
    // eslint-disable-next-line
  }, [menuDB])
  
  const handleDefaultSort = () => {
    setListItems(data.map(d => mapBDEntryToLI(d)))
  };

  const handleFromSmallestSort = () => {
    let sortedCpy = [...data]  // copy of the array
    sortedCpy.sort((a, b) => a.currentTimeInterval[0] - b.currentTimeInterval[0])
    setListItems(sortedCpy.map(d => mapBDEntryToLI(d)))
  };
  
  function timeToColor(t) {
    if (t < 4) return "#5abf01"
    if (t < 7) return "#a8d500"
    if (t < 11) return "#fec901"
    if (t < 15) return "#f5934c"
    return "#f0582f"
  }

  function generateRandomTime(min, max) {
    let interval = max - min
    let r1 = Math.floor(Math.random() * interval) + min
    let r2 = Math.floor(Math.random() * interval) + min
    // console.log(Math.abs(r1 - r2), Math.abs(r1 - r2) >= 8);
    while (Math.abs(r1 - r2) >= 8 && !(1/1.7 <= r1 / r2 && r1/r2 <= 1.7)) {
      console.log(r1, r2);
      r1 = Math.floor(Math.random() * interval) + min
      r2 = Math.floor(Math.random() * interval) + min
    }
    return [Math.min(r1, r2), Math.max(r1, r2)]
  }

  function mapBDEntryToLI(entry) {
    let time = entry.currentTimeInterval
    let t1percent = time[0] <= 20 ? time[0]/0.2 : 100
    let t2percent = time[1] <= 20 ? time[1]/0.2 : 100
    let innerText = [
        <h2>
          {
            `Ravintola ${entry.name}: `
          }
          <br/>
          <Menu 
            availableFood={menuDB[entry.id]} 
          />
        </h2>,
          <div className="pie pie1 animate1 no-round" style={{"--p1":t2percent, "--c1":"#8e8e8e"}}>
            <div className="pie2 animate2 no-round" style={{"--p2":t1percent, "--c2":"#cbcbcb"}}>
              <div className="square">
                <div>
                  <div className="big-text">
                    {time[0] === time[1] ? time[0] : `${time[0]} - ${time[1]}`}
                  </div>
                  minuuttia
                </div>
              </div>
            </div>
          </div>
    ]
    return <li 
        style={{backgroundColor: timeToColor(1/2 * (time[0] + time[1]))}} 
        key={Math.floor(Math.random()*1e9)}
        className="restaurant"
        // onClick={() => console.log(menuDB)}
      >
       {innerText}
    </li>
  }

  return (
    <div className="wrapper">
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
      <ol className="restaurantList">
        {listItems}
      </ol>
    </div>
  );
}

const Menu = ({availableFood}) => {
  const [visible, setVisible] = useState(false)

  
  if (!visible) return <button onClick={() => setVisible(true)}>Näytä menu</button>
  
  if (availableFood === undefined) {
    console.log("no data")
    return <>
      <button onClick={() => setVisible(false)}>Piilota menu</button>
      No data :(
    </>
  }

  let foodValues = Object.values(availableFood)[0]
  // console.log(foodValues)
  let foods = foodValues.map(i => <li className="foodmenu-li">{i["title"]}</li>)
  return <>
    <button onClick={() => setVisible(false)}>Piilota menu</button>
    {foods}
  </>
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
        <ul className="menu">
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
        </ul>
      ) : null}
    </div>
  );
};

export default App;
