import React, { useState } from 'react';
import { dataabout } from '../content_option';

function About() {
  const [age, setAge] = useState(21);

  const increaseAge = () => {
    setAge(age + 1);
  };

  const decreaseAge = () => {
    setAge(age - 1);
  };

  return (
    <div className="about-section">
      <div className="about-text">
        <p>นายพชร มีหา</p>
        <p>เกิดวันที่ 10 มิถุนายน 2546</p>
        <p>สัญชาติ ไทย</p>
        <p>ศาสนา พุทธ</p>
        <p>เพศ ชาย</p>
        <p>อายุ: {age}</p>
        <div className="age-controls">
          <button onClick={decreaseAge} className="btn btn-primary mx-2">-</button>
          <button onClick={increaseAge} className="btn btn-primary mx-2">+</button>
        </div>
      </div>
    </div>
  );
}

export default About;