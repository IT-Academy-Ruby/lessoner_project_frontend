import { number } from "yup";
import { Category, Lesson } from "../lessons/Lessons";

export const GetDataWithCategoryNames = (
  lessonsArr: Lesson[],
  id: number | undefined
): any => {
  const categoryId = lessonsArr.find((elem) => elem.id)?.category_id;
  console.log(categoryId);
};
