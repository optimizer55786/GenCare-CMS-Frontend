export interface CardProps {
    card_header: string;
    card_body: string;
    card_footer: string;
    card_background: string;
    video: boolean;
    audio: boolean;
}

export interface DailyFuelQueueDataProps {
    date: string;
    cards: CardProps[];
}