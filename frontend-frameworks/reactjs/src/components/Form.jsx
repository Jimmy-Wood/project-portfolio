import { useState } from "react";

export default function Form(props) {
  const { handleCloseModal, handleUpdateData, name, setName, lifeExpectancy, setLifeExpectancy } = props;

  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

  return (
    <section id="form">
      <div>
        <h4 className="text-gradient">Your Details</h4>
        <button onClick={handleCloseModal} className="link-button">
          <i className="fa-solid fa-xmark"/>
        </button>
      </div>
      <div>
        <label>Name</label>
        <input value={name} type="text" required onChange={(e) => {setName(e.target.value)}}/>
      </div>
      <div>
        <label>Birth Date</label>
        <div className="bday">
          <select value={day} onChange={(e) => {setDay(e.target.value)}}>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select value={month} onChange={(e) => {setMonth(e.target.value)}}>
            {months.map((month, index) => (
              <option key={month} value={index + 1}>{month}</option>
            ))}
          </select>
          <select value={year} onChange={(e) => {setYear(e.target.value)}}>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
       </div>
       <div>
        <label>Life Expectancy (years)</label>
        <input type="number" required min="1" max="120" value={lifeExpectancy} onChange={(e) => {setLifeExpectancy(e.target.value)}}/>
       </div>
       <button onClick={() => {
        handleUpdateData(name, `${year}-${month}-${day}`, lifeExpectancy);
       }}>
        Save
       </button>
    </section>
  );
}
