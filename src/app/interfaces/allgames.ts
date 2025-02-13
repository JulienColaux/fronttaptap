export interface JoueurForAllGames {
    iD_Joueur: number;
    nom: string;
    avatar_URL: string;
    points: number;
}

export interface PartieForAllGames {
    iD_Partie: number;
    date_Partie: string;
    amical: boolean;
    joueurs: JoueurForAllGames[];
}

