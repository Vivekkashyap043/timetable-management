import React, { useState, useRef, useEffect } from 'react';

const courses = {
  "19BS1MT01": {
    "Name": "Calculus for Engineers (CFE)",
    "Faculty": "Dr. V. Sree Ramani",
    "Category": "OTHERS"
  },
  "19BS1PH02": {
    "Name": "Engineering Physics (EP)",
    "Faculty": "Dr. M. Sumithra",
    "Category": "CVA-L1"
  },
  "19ES1CS01": {
    "Name": "Programming through C (PC)",
    "Faculty": "Dr. D.N. Vasundhara",
    "Category": "MTP"
  },
  "19ES1EE01": {
    "Name": "Basics of Electrical Energy for Engineers (BEEE)",
    "Faculty": "Dr. K. Veerasham",
    "Category": "LIB"
  },
  "19BS2PH02": {
    "Name": "Engineering Physics Laboratory (EP Lab)",
    "Room": "C-308",
    "Faculty": [
      "Dr. M. Sumithra",
      "Dr. G.V. Rao"
    ],
    "Category": "SL"
  },
  "19ES2CS01": {
    "Name": "Programming through C Laboratory (PC Lab)",
    "Room": [
      "A-108 (B1)",
      "B-316 (B2)"
    ],
    "Faculty": [
      "Dr. D.N. Vasundhara"
    ]
  },
  "19ES2EE01": {
    "Name": "Basic Electrical Engineering Laboratory (BEE Lab)",
    "Room": "P-014",
    "Faculty": [
      "Dr. K. Veerasham"
    ]
  },
  "19ES3ME02": {
    "Name": "Engineering Drawing (ED)",
    "Room": "D-313",
    "Faculty": [
      "Dr. K. Balashowry"
    ]
  },
  "19PW4CS01": {
    "Name": "Design Sensitization (DS)",
    "Room": "KS-Auditorium"
  }
};

const Dropdown = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = Object.entries(courses)
      .filter(([key, course]) => course.Name.toLowerCase().includes(inputValue.toLowerCase()))
      .map(([key, course]) => ({ id: key, ...course }));

    setFilteredNames(filtered);
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (course) => {
    setSelectedValue(course.Name);
    setInputValue(course.Name);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <input 
        type="text" 
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
        placeholder="Search for a course..."
        style={{ width: '200px', padding: '8px', boxSizing: 'border-box' }}
      />
      {isOpen && (
        <ul style={{ 
          position: 'absolute', 
          zIndex: 1, 
          background: '#fff', 
          border: '1px solid #ccc', 
          listStyleType: 'none', 
          padding: '0', 
          margin: '0', 
          width: '200px', 
          maxHeight: '150px', 
          overflowY: 'auto'
        }}>
          {filteredNames.map(course => (
            <li 
              key={course.id} 
              onClick={() => handleOptionClick(course)} 
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              {course.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
