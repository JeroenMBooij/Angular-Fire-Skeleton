import { IDeckIdentity } from "./deck-identity.interface";

export interface IDeck extends IDeckIdentity
{
    userId: string;
    type: string;
    category: string;
    description: string;
    feedbackOption: string;
    intervalModifier: string;
    hardIntervalModifier: string;
    defaultEaseModifier: string;
    easeBonus: string;
    easePenalty: string;
    again: string;
    hard: string;
    good: string;
    easy: string;
}