export const NAV_ITEMS = [
    { id: 1, label: "Početna", href: "/" },
    { id: 2, label: "Recepti", href: "/recepti" },
    { id: 3, label: "Inspiracija", href: "/inspiracija" },
];

export type TNavbarItem = {
    id: number;
    label: string;
    href?: string;
};
