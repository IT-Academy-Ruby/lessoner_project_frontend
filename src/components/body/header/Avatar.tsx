import "./Header.scss";
import {nameDecodeUser} from "../../../store/header/decodeJwtSlice";
import {useAppSelector, useAppDispatch} from "../../../store/hooks";

const Avatar = () => {
  const dispatch = useAppDispatch();
  const nameDecode = useAppSelector(state => state.userDecodeName.name);
  dispatch(nameDecodeUser());
  console.log(nameDecode)
  const letters = nameDecode.split(" ").map(word => word[0]).slice(0, 2).join("").toLocaleUpperCase();

  return (
    <div className="avatar">
      <p className="first-letters">{letters}</p>
    </div>
  )
}

export default Avatar;