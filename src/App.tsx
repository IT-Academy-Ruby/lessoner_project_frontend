import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/body/Body";

function App(): any {
  return (
    <BrowserRouter>
      <div className="App">
        <Body />
      </div>
    </BrowserRouter>
  );
}

export default App;
