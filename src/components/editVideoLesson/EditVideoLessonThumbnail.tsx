import "./EditVideoLessonThumbnail.scss";

export const EditVideoLessonThumbnail = () => {
  const items = [
    {id: 1, src: ""},
    {id: 2, src: ""},
    {id: 3, src: ""},
    {id: 4, src: ""},
  ];

  const thumbnailId = (id: number) => {
    console.log(id);
  };

  return (
    <div className="evlth__wrapper">
      <div className="evlth__inner">
        {items.map((item: {
          id: number; src: string;
          }) =>
          <div 
            className="evlth__item" 
            key={item.id}
            onClick={() => thumbnailId(item.id)}
          >
            {/* <img className="evlth__item-img" src={item.src} alt="picture"/> */}
          </div>
        )
        }
      </div>
    </div>
  );
};
