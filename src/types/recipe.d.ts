import { TStep } from "./step";
import { TImage } from "./image";
import { TIngredient } from "./ingredient";
import { TCategory } from "./category";
import { TUser } from "./user";

export type TRecipeAttributes = {
    title: string;
    slug: string;
    description: string | null;
    preparing_time: number | null;
    cooking_time: number | null;
    serving_for: number | null;
    views: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isPopular: boolean;
    main_image: {
        data: TImage | null;
    };
    ingredients: TIngredient[] | [];
    steps: TStep[] | [];
    owner: {
        data: TUser;
    };
    categories: {
        data: TCategory[] | null;
    };
};

export type TRecipe = {
    id: number;
    attributes: TRecipeAttributes;
};
