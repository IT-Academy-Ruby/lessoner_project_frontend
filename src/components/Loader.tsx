import "./loader.scss";

const Loader = () => {
  const speed = 3;
  const elements = 30;
  const array = [];
  for (let i = 1; i <= elements; ++i) {
    array[i] = i;
  }
  return (
    <div className="lds-spinner">
      {
        array.map(field => <div key={field} style={
          {transform: `rotate(${360 / elements * field}deg)`,
            animationDelay: `${speed / elements * field}s`}
        }/>)
      }
    </div>
  );
};
export default Loader;