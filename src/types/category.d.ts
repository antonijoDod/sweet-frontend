export type TCategoryAttributes = {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string | null;
};

export type TCategory = {
    id: number;
    attributes: TCategoryAttributes;
};
