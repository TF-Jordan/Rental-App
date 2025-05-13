export interface Activite {
    date: string;
    description: string;
    duree: number;
    statut: 'Complété' | 'En cours' | 'En attente';
    type: 'Formation' | 'Projet' | 'Réunion' | 'Congé';
}

export interface Statistics {
    formations: number;
    projetsEnCours: number;
    tauxPresence: number;
    performance: number;
  }

export interface Personnel {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    poste: string;
    departement: string;
    dateEmbauche: string;
    salaire: number;
    statut: string;
    adresse: string;
    photo: string;
    competences: string[];
    calendrierService: Record<string, boolean>;
    activites: Activite[];
    statistiques: Statistics;
}

export interface PersonnelData {
    personnel: Personnel[];
    departements: string[];
    postes: string[];
    statuts: string[];
}
