import { ICardMedia } from "./card-media.model";
import { ICard } from "./card.model";

export interface ICustomCard extends ICard
{
    frontHtml: string;
    backHtml: string;
    css: string;
    javascript: string;
    images: ICardMedia[];
}