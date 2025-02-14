import { Trophee } from "./trophee";

export interface Joueur {
  iD_Joueur: number;
  nom: string;
  avatar_URL?: string;
  xp: number;
  iD_EchelleGrade?: number;
  elo: number;
  trophees: Trophee[]; 
}
