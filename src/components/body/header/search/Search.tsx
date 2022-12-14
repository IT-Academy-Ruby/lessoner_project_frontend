import "./search.scss";
import {useEffect, useState} from "react";
import Arrow from "../../../icons/Arrow.svg";
import Cross from "../../../icons/Cross.svg";
import {Link} from "react-router-dom";

const Search = () => {
  const [isValue, setIsValue] = useState(false);
  const [value, setValue] = useState("");

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    setIsValue(!!value.length);
  }, [value]);

  return (
    <div className="search-component">
      <Link to="/" className="search-arrow">
        <img src={Arrow} alt="arrow"/>
      </Link>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={fieldHandler}
        className="search-input"
      />
      {isValue && <div className="search-cross" onClick={() => setValue("")}>
        <img src={Cross} alt="cross" className="cross"/>
      </div>}
    </div>
  );
};

export default Search;