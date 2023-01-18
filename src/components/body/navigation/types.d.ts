import { messages_en } from "../../../translations/en";

export type Status = {
    authorized: boolean;
    admin: boolean;
    lightTheme: boolean;
    snowing: boolean;
}

export type Item = {
    id: number;
    valueId?: keyof typeof messages_en;
    icon: string;
    href: string;
    includeIn?: keyof Status;
    excludeFrom?: keyof Status;
    onClick?: VoidFunction;
    isHighlighted?: boolean;
}

export type Config = {
    body: Item[],
    footer: Item[],
    social: Item[],
}

export interface NavbarStudyStudioProps {
    config: Config;
    isMenuActive: boolean;
}
