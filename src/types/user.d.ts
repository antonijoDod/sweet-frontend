export type TUserAttributes = {
    username: string;
    email: string;
    full_name: string;
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
