import {Link} from "react-router-dom";
import Arrow from "./icons/Arrow.svg";
import Cross from "./icons/Cross.svg";
import "./search.scss";
import {useState} from "react";

const Search = () => {
  const [isValue, setIsValue] = useState(false);
  const [value, setValue] = useState('');

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (value.length > 0) {
      setIsValue(true);
    }
  }

  return (
    <div className='search-component'>
      <Link to='/' className='search-arrow'>
        <img src={Arrow} alt='arrow'/>
      </Link>
      <input type='text' placeholder='Search' onChange={fieldHandler} className='search-input' value={value}/>
      <div className='search-cross' onClick={() => setValue('')}>
        <img src={Cross} alt='cross' className='cross'/>
      </div>
    </div>
  )
}
export default Search;