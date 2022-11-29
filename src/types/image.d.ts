export type TImageFormat = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null;
    width: number;
    height: number;
    size: number;
    url: string;
};

export type TImageAttributes = {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
        thumbnail: TImageFormat;
        small: TImageFormat;
        medium: TImageFormat;
        large: TImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
};

export type TImage = {
    id: number;
    attributes: TImageAttributes;
};
