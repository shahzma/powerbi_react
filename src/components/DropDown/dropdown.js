import React, { useState } from 'react';
import './dropdown.css';
import { GiBreakingChain, GiConsoleController, GiEvilFork, GiHealthNormal, GiCarWheel, GiClothes,GiMedicines,GiFruitBowl, GiVideoConference, GiHamburgerMenu } from "react-icons/gi";
import { FaAmazon, FaTrafficLight,FaUsers, FaDeezer,FaAlignLeft, FaKeyboard, FaCity } from 'react-icons/fa';


function MyDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // window.localStorage.setItem('dropdnOption', option.label)
    // console.log('op=', option)
    props.onOptionSelect(option);
    // setIsOpen(false);
  };

  let option1 = [{ id: 1, name: 'Option 1', icon: <GiHamburgerMenu/> },
  { id: 2, name: 'Option 2', icon: <GiHamburgerMenu/> },
  { id: 3, name: 'Option 3', icon: <GiHamburgerMenu/> }]

  return (
    <div className="dropdown">
      {/* {window.localStorage.getItem('dropdnOption')===undefined?<button className="dropdown-toggle" onClick={toggleDropdown}>
        Select Platform
      </button>:<button className="dropdown-toggle" onClick={toggleDropdown}>
     { window.localStorage.getItem('dropdnOption')}
      </button>} */}
      {props.prev_value===null?<button className="dropdown-toggle" onClick={toggleDropdown}>
        Select Platform
      </button>:<button className="dropdown-toggle" onClick={toggleDropdown}>
     { props.prev_value}
      </button>}
      {/* <button className="dropdown-toggle" onClick={toggleDropdown}>
        Select Platform
      </button> */}
      {isOpen ? (
        <ul className="menu">
            {props.options.map((option) => (
            <li
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              <span className="option-icon">{option.icon}</span>
              {/* <span className="option-icon"><FaAmazon/></span> */}
              <span className="option-text">{option.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default MyDropdown;
