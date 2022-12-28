export const NAV_ITEMS = [
    { id: 1, label: "Početna", href: "/" },
    { id: 2, label: "Recepti", href: "/recepti" },
];

export type TNavbarItem = {
    id: number;
    label: string;
    href?: string;
};
