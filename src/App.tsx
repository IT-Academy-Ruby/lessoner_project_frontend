import {useState} from "react";
import requestApi from "./services/request";

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const get = () => {
    requestApi("https://lessoner-prod.herokuapp.com/categories").then(request => request.json())
      .then(result => console.log(result));
  };
  const post = () => {
    requestApi("https://lessoner-prod.herokuapp.com/categories", "POST", {
      "name": `${name}`,
      "description": `${description}`,
      "status": "active"
    }).then(request => request.json()).then(result => console.log(result));
  };
  const put = () => {
    requestApi(`https://lessoner-prod.herokuapp.com/categories/${id}`, "PUT", {
      "name": `${name}`,
      "description": `${description}`,
      "status": "active"
    }).then(request => request.json()).then(result => console.log(result));
  }

  return (
    <div>
      <button onClick={get}>GET</button>
      <button onClick={post}>POST</button>
      <button onClick={put}>PUT</button>
      <div style={{display: 'flex'}}>
        <label>ID
          <input
            type='number'
            onChange={(e) => setId(e.currentTarget.value)}
            value={id}
          />
        </label>
        <label>Name
          <input
            type='text'
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </label>
        <label>Description
          <input
            type='text'
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
