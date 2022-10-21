import { useEffect } from "react";
import { getData } from "./services/services";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/body/Body";

function App(): any {
  useEffect(() => {
    getData();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Body />
      </div>
    </BrowserRouter>
  );
}

export default App;