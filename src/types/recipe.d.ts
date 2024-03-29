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
    isOnSlider: boolean;
    likes: number;
    featured_image: {
        data: TImage | null;
    };
    gallery_images: {
        data: TImage[] | null;
    }
    ingredients: TIngredient[] | [];
    steps: TStep[] | [];
    owner: {
        data: TUser;
    };
    categories: {
        data: TCategory[];
    };
};

export type TRecipe = {
    id: number;
    attributes: TRecipeAttributes;
};
