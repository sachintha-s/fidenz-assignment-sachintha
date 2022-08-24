import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card.js";
import Records from "./cities.json";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton.js";
import LogoutButton from "./components/LogoutButton.js";

const cityCodes = Records.List.map((record) => {
  return record.CityCode;
});

const casheTime = 500000;
var cashe = {};

const fetchWithCashe = async () => {
  const now = new Date().getTime();
  if (!cashe.data || cashe.casheTimer < now) {
    let res = await fetchData();
    cashe.data = res.data.list;
    cashe.casheTimer = now + casheTime;
    localStorage.setItem("dataCash", JSON.stringify(cashe));
  }
  return cashe.data;
};

const fetchData = async () => {
  let res = await axios.get(
    `https://api.openweathermap.org/data/2.5/group?id=${cityCodes.toString()}&units=metric&appid=8344082b8526b93cff0bd47e6255717c`
  );
  return res;
};
function App() {
  const { isAuthenticated,isLoading, } = useAuth0();
  if (isAuthenticated) {
    return <HomePage />;
  }else{
  return isLoading?  <div>Loading</div> : <LoginButton/>
  }
}

function HomePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let cashedData = JSON.parse(localStorage.getItem("dataCash"));
    if (cashedData) {
      cashe = cashedData;
    }
    fetchWithCashe()
      .then((res) => {
        setData(res);
      })
      .catch((err) => alert("Please check your Internet connection " + err));
  }, []);
  if (data.length === 0) {
    return <div>Data Loading</div>;
  } else {
    return (
      <>
      <LogoutButton/>
       <ul className="flex-container">
        {data.map((element) => (
          <Card key={element.id} data={element} />
        ))}
      </ul>
      </>
     
    );
  }
}

export default App;
