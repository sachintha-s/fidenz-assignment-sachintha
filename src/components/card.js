import "../App.css";
const Card = (props) => {
  return (
    <div className="card">
      <div className="name">{props.data["name"]}</div>
      <div className="dis">{props.data["weather"][0]["description"]}</div>
      <div className="temp">{props.data["main"]["temp"]} °C</div>
      <div className="id">ID: {props.data["id"]}</div>
    </div>
  );
};
export default Card;
