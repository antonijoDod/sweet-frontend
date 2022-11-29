import { TRecipe } from "./recipe";
import { TPagination } from "./meta";

export type TRecipes = {
    data: TRecipe[];
    meta: TPagination;
};
