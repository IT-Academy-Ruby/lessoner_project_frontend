import "./Header.scss";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";

const Avatar = () => {
  const dispatch = useAppDispatch();
  const nameDecode = useAppSelector(state => state.userDecodedName.session.name);
  dispatch(nameDecodedUser());
  const initial= nameDecode.split(" ")
    .map(word => word[0]).slice(0, 2).join("").toLocaleUpperCase();

  return (
    <div className="avatar">
      <p className="first-letters">{initial}</p>
    </div>
  );
};

export default Avatar;