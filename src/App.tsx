import "./App.css";
import Body from "./components/body/Body";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Body />
      </div>
    </BrowserRouter>
  );
}

export default App;
