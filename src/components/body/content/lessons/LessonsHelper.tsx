import { Category, Lesson } from "./Lessons";

interface Map {
  [key: number]: string;
}

export const GetDataWithCategoryNames = (
  categoriesArr: Category[],
  dataArr: Lesson[]
) => {
  const categoriesMap = categoriesArr.reduce((map: Map, cat: Category) => {
    map[cat.id] = cat.name;
    return map;
  }, {});

  dataArr.map((les) => {
    les.categoryName = categoriesMap[les.category_id];
  });
  return dataArr;
};
