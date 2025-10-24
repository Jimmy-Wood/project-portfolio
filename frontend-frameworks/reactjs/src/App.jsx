import Layout from "./components/layouts/Layout.jsx";
import Hero from "./components/Hero.jsx";
import Clocks from "./components/Clocks.jsx";
import Calendar from "./components/Calendar.jsx";
import Summary from "./components/Summary.jsx";
import { calculateTimeLeft, getLifePercentageLived } from "./utils/index.js";
import Portal from "./components/Portal.jsx";
import Form from "./components/Form.jsx";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("James");
  const [birthDate, setBirthDate] = useState("1992-06-12");
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(calculateTimeLeft(birthDate, lifeExpectancy));

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  function resetData() {
    setName("James");
    setBirthDate("1992-06-12");
    setLifeExpectancy(80);
    localStorage.clear();
  }

  function handleUpdateData(newName, newBirthDate, newLifeExpectancy) {
    if (!newName || !newBirthDate || !newLifeExpectancy) return;

    //Save data to local storage
    localStorage.setItem("formData", JSON.stringify({name: newName, birthDate: newBirthDate, lifeExpectancy: newLifeExpectancy}));    

    //Update state
    setName(newName);
    setBirthDate(newBirthDate);
    setLifeExpectancy(parseInt(newLifeExpectancy));
    handleToggleModal();
  }

  const percentage = getLifePercentageLived(birthDate, lifeExpectancy);

  useEffect(() => {
    if (!localStorage) return;
    if (localStorage.getItem("formData")) {
      const {name: n, birthDate: b, lifeExpectancy: e} = JSON.parse(localStorage.getItem("formData"));
      setName(n);
      setBirthDate(b);
      setLifeExpectancy(parseInt(e));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(calculateTimeLeft(birthDate, lifeExpectancy));
    }, 1000);
    return () => { clearInterval(interval) };
  }, [birthDate, lifeExpectancy]);

  return (
    <Layout>
      {showModal && (
        <Portal handleCloseModal={handleToggleModal}>
          <Form handleUpdateData={handleUpdateData} handleCloseModal={handleToggleModal} name={name} setName={setName} lifeExpectancy={lifeExpectancy} setLifeExpectancy={setLifeExpectancy} />
        </Portal>
      )}
      <Hero name={name} data={data} percentage={percentage} handleToggleModal={handleToggleModal} resetData={resetData} />
      <Clocks data={data} />
      <Calendar lifeExpectancy={lifeExpectancy} data={data} />
      <Summary lifeExpectancy={lifeExpectancy} birthDate={birthDate} />
    </Layout>
  );
}

export default App;
