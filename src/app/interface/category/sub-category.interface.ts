import { IMainCategory } from "./main-category.interface";

export interface ISubCategory {
  id?: number;
  name?: string;
  mainCategoryId?: number;
  mainCategory?: IMainCategory;
}
