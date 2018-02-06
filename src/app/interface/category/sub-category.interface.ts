import { IMainCategory } from "./main-category.interface";

export interface ISubCategory {
  _id?: string;
  name?: string;
  _mainCategory?: IMainCategory;
}
