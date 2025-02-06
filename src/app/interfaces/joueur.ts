export interface Joueur {
  ID_Joueur: number;
  nom: string;
  avatar_URL?: string;
  xp: number;
  ID_EchelleGrade?: number;
  elo: number;
  trophees: any;  // Adapter le type selon votre besoin
}
