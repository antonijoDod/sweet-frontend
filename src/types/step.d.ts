import { TImage } from "./image";

export type TStep = {
    id: number;
    description: string;
    step_image: {
        data: TImage | null;
    };
};
