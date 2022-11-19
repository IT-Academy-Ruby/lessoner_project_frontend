import {useAppSelector} from "../../../../store/hooks";
const Lessoner = () => {
  const decodeUserName = useAppSelector(state => state.userDecodeName.name);
  return <div>
    <h1>{decodeUserName}</h1>
  </div>;
};
export default Lessoner;
