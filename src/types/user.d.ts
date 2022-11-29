export type TUserAttributes = {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TUser = {
    id: number;
    attributes: TUserAttributes;
};
