import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//  COMPOSANT PRINCIPAL : TABLEAU DE GESTION DU PERSONNEL
// Ce composant affiche la liste complète du personnel avec :
// - Photos des employés (plus d'initiales dans des cercles)
// - Filtrage avancé par nom, département, poste, statut
// - Données extraites d'un fichier JSON externe
// - Interface moderne avec cards au lieu d'un tableau classique

// TYPES ET INTERFACES TYPESCRIPT
// Définition des structures de données pour le personnel

// Interface pour une activité d'un employé (formation, projet, etc.)
export interface Activite {
  date: string;                                    // Date de l'activité (format ISO)
  description: string;                             // Description de l'activité
  duree: number;                                   // Durée en heures
  statut: 'Complété' | 'En cours' | 'En attente'; // État de l'activité
  type: 'Formation' | 'Projet' | 'Réunion' | 'Congé'; // Type d'activité
}

// Interface pour les statistiques personnelles d'un employé
export interface Statistics {
  formations: number;        // Nombre total de formations suivies
  projetsEnCours: number;   // Nombre de projets actuellement en cours
  tauxPresence: number;     // Pourcentage de présence (0-100)
  performance: number;      // Score de performance (0-100)
}

// Interface principale pour un employé
export interface Personnel {
  id: number;                                      // Identifiant unique
  nom: string;                                     // Nom de famille
  prenom: string;                                  // Prénom
  email: string;                                   // Adresse email professionnelle
  telephone: string;                               // Numéro de téléphone
  poste: string;                                   // Intitulé du poste
  departement: string;                             // Département d'appartenance
  dateEmbauche: string;                            // Date d'embauche (format ISO)
  salaire: number;                                 // Salaire en XAF
  statut: string;                                  // Statut (Actif, En congé, etc.)
  adresse: string;                                 // Adresse personnelle
  photo: string;                                   // URL de la photo de profil
  competences: string[];                           // Liste des compétences
  calendrierService: Record<string, boolean>;      // Planning de présence
  activites: Activite[];                           // Liste des activités
  statistiques: Statistics;                        // Statistiques personnelles
}

// Interface pour l'ensemble des données du personnel
export interface PersonnelData {
  personnel: Personnel[];     // Liste de tous les employés
  departements: string[];     // Liste des départements disponibles
  postes: string[];          // Liste des postes disponibles
  statuts: string[];         // Liste des statuts possibles
}

// IMPORT DES DONNÉES JSON
// Import du fichier JSON contenant toutes les données du personnel
// Ce fichier doit être placé dans le dossier data/ à la racine du projet
import personnelData from '@/assets/personnel.json';

// 🔧 PROPS DU COMPOSANT - CORRIGÉES POUR CORRESPONDRE À GENERALVIEW
// Props reçues depuis le composant parent (GeneralView) pour le filtrage
interface StaffTableProps {
  searchText: string;                    // Texte de recherche saisi par l'utilisateur
  selectedDepartment: string | null;     // Département sélectionné (valeur unique)
  selectedPost: string | null;           // Poste sélectionné (valeur unique)
  selectedStatus: string | null;         // Statut sélectionné (valeur unique)
}

//  COMPOSANT PRINCIPAL
const StaffTable: React.FC<StaffTableProps> = ({
                                                 searchText,
                                                 selectedDepartment,
                                                 selectedPost,
                                                 selectedStatus,
                                               }) => {
  // ÉTAT LOCAL DU COMPOSANT
  const [data, setData] = useState<PersonnelData | null>(null);  // Données du personnel chargées
  const [loading, setLoading] = useState(true);                   // État de chargement

  //  CHARGEMENT DES DONNÉES AU MONTAGE DU COMPOSANT
  useEffect(() => {
    // Simulation d'un chargement asynchrone
    // Dans un vrai projet, tu pourrais faire un appel API ici
    // Exemple : fetchPersonnelFromAPI()
    setTimeout(() => {
      setData(personnelData as PersonnelData);  // Cast du JSON vers le type PersonnelData
      setLoading(false);                        // Arrêt du loading
    }, 100);
  }, []); // Tableau vide = exécution une seule fois au montage

  // 🔍 FONCTION DE FILTRAGE AVANCÉE - CORRIGÉE
  // Cette fonction applique tous les filtres sélectionnés par l'utilisateur
  const getFilteredPersonnel = (): Personnel[] => {
    if (!data) return []; // Sécurité : retourne un tableau vide si pas de données

    return data.personnel.filter((person) => {
      //  FILTRE 1 : Recherche textuelle
      // Recherche dans le nom complet, email et poste
      const matchesSearch = searchText === '' ||
          `${person.prenom} ${person.nom}`.toLowerCase().includes(searchText.toLowerCase()) ||
          person.email.toLowerCase().includes(searchText.toLowerCase()) ||
          person.poste.toLowerCase().includes(searchText.toLowerCase());

      // Si aucun département sélectionné (null), affiche tous
      // Sinon, affiche seulement ceux du département sélectionné
      const matchesDepartment = selectedDepartment === null ||
          person.departement === selectedDepartment;


      // Même logique que pour les départements
      const matchesPost = selectedPost === null ||
          person.poste === selectedPost;


      // Même logique que pour les départements et postes
      const matchesStatus = selectedStatus === null ||
          person.statut === selectedStatus;

      //  RÉSULTAT : L'employé doit correspondre à TOUS les filtres
      return matchesSearch && matchesDepartment && matchesPost && matchesStatus;
    });
  };

  //  FONCTION POUR LES COULEURS DE STATUT
  // Retourne une couleur selon le statut de l'employé
  const getStatusColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'actif': return '#10B981';      // Vert - Employé actif
      case 'en congé': return '#F59E0B';   // Orange - En congé
      case 'inactif': return '#EF4444';    // Rouge - Inactif
      case 'formation': return '#3B82F6';  // Bleu - En formation
      default: return '#6B7280';           // Gris - Statut inconnu
    }
  };

  //  FONCTION POUR FORMATER LE SALAIRE
  // Ajoute des espaces pour la lisibilité et la devise XAF
  const formatSalary = (salaire: number) => {
    return `${salaire.toLocaleString()} XAF`;
  };

  // FONCTION POUR CALCULER L'ANCIENNETÉ
  // Calcule la différence entre la date d'embauche et aujourd'hui
  const calculateAnciennete = (dateEmbauche: string) => {
    const embauche = new Date(dateEmbauche);    // Date d'embauche
    const maintenant = new Date();              // Date actuelle

    // Calcul de la différence en mois
    const diffEnMois = (maintenant.getFullYear() - embauche.getFullYear()) * 12 +
        (maintenant.getMonth() - embauche.getMonth());

    // Formatage selon la durée
    if (diffEnMois < 12) {
      return `${diffEnMois} mois`;              // Moins d'un an
    } else {
      const annees = Math.floor(diffEnMois / 12);
      const moisRestants = diffEnMois % 12;
      return moisRestants > 0 ? `${annees}a ${moisRestants}m` : `${annees} ans`;
    }
  };

  // AFFICHAGE PENDANT LE CHARGEMENT
  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement du personnel...</Text>
        </View>
    );
  }

  //  RÉCUPÉRATION DES DONNÉES FILTRÉES
  const filteredPersonnel = getFilteredPersonnel();

  //  RENDU PRINCIPAL DU COMPOSANT
  return (
      <View style={styles.container}>
        {/*  EN-TÊTE DU TABLEAU */}
        {/* Affiche le nombre d'employés trouvés après filtrage */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Personnel ({filteredPersonnel.length})</Text>
        </View>

        {/* 👥 LISTE DU PERSONNEL */}
        {filteredPersonnel.length === 0 ? (
            //  AFFICHAGE SI AUCUN RÉSULTAT
            // Cas où aucun employé ne correspond aux filtres
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color="#6B7280" />
              <Text style={styles.emptyText}>Aucun employé trouvé</Text>
              <Text style={styles.emptySubtext}>
                Essayez de modifier vos critères de recherche
              </Text>
            </View>
        ) : (
            // AFFICHAGE DE LA LISTE DES EMPLOYÉS
            // Boucle sur tous les employés filtrés
            filteredPersonnel.map((person) => (
                <TouchableOpacity key={person.id} style={styles.personnelCard}>
                  {/*  EN-TÊTE DE LA CARTE EMPLOYÉ */}
                  <View style={styles.cardHeader}>
                    {/*  PHOTO DE PROFIL */}
                    {/* NOUVEAU : Affichage de la vraie photo au lieu des initiales */}
                    <Image
                        source={{ uri: person.photo }}                              // URL de la photo
                        style={styles.profilePhoto}                                 // Style du cercle
                        // Image par défaut gérée par le backgroundColor du style
                    />

                    {/* ℹ INFORMATIONS PRINCIPALES */}
                    <View style={styles.mainInfo}>
                      {/* Nom complet de l'employé */}
                      <Text style={styles.personName}>
                        {person.prenom} {person.nom}
                      </Text>
                      {/* Poste occupé (en bleu) */}
                      <Text style={styles.personPosition}>{person.poste}</Text>
                      {/* Département (en gris) */}
                      <Text style={styles.personDepartment}>{person.departement}</Text>
                    </View>

                    {/*  BADGE DE STATUT */}
                    {/* Couleur dynamique selon le statut */}
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(person.statut) }]}>
                      <Text style={styles.statusText}>{person.statut}</Text>
                    </View>
                  </View>

                  {/*  INFORMATIONS DE CONTACT ET DÉTAILS */}
                  <View style={styles.cardDetails}>
                    {/* Email avec icône */}
                    <View style={styles.detailRow}>
                      <Ionicons name="mail-outline" size={14} color="#6B7280" />
                      <Text style={styles.detailText}>{person.email}</Text>
                    </View>

                    {/* Téléphone avec icône */}
                    <View style={styles.detailRow}>
                      <Ionicons name="call-outline" size={14} color="#6B7280" />
                      <Text style={styles.detailText}>{person.telephone}</Text>
                    </View>

                    {/* Date d'embauche et ancienneté calculée */}
                    <View style={styles.detailRow}>
                      <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                      <Text style={styles.detailText}>
                        Embauché le {new Date(person.dateEmbauche).toLocaleDateString('fr-FR')}
                        ({calculateAnciennete(person.dateEmbauche)})
                      </Text>
                    </View>

                    {/* Salaire formaté */}
                    <View style={styles.detailRow}>
                      <Ionicons name="cash-outline" size={14} color="#6B7280" />
                      <Text style={styles.detailText}>{formatSalary(person.salaire)}</Text>
                    </View>
                  </View>

                  {/*  STATISTIQUES RAPIDES */}
                  {/* Section avec les KPIs personnels de l'employé */}
                  <View style={styles.cardStats}>
                    {/* Nombre de formations suivies */}
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{person.statistiques.formations}</Text>
                      <Text style={styles.statLabel}>Formations</Text>
                    </View>

                    {/* Projets en cours */}
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{person.statistiques.projetsEnCours}</Text>
                      <Text style={styles.statLabel}>Projets</Text>
                    </View>

                    {/* Taux de présence en pourcentage */}
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{person.statistiques.tauxPresence}%</Text>
                      <Text style={styles.statLabel}>Présence</Text>
                    </View>

                    {/* Score de performance */}
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{person.statistiques.performance}%</Text>
                      <Text style={styles.statLabel}>Performance</Text>
                    </View>
                  </View>

                  {/*  COMPÉTENCES */}
                  {/* Affichage des compétences sous forme de tags */}
                  <View style={styles.competencesContainer}>
                    <Text style={styles.competencesTitle}>Compétences:</Text>
                    <View style={styles.competencesList}>
                      {/* Affiche les 3 premières compétences */}
                      {person.competences.slice(0, 3).map((competence, index) => (
                          <View key={index} style={styles.competenceTag}>
                            <Text style={styles.competenceText}>{competence}</Text>
                          </View>
                      ))}
                      {/* Si plus de 3 compétences, affiche un compteur */}
                      {person.competences.length > 3 && (
                          <View style={styles.competenceTag}>
                            <Text style={styles.competenceText}>+{person.competences.length - 3}</Text>
                          </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
            ))
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  // CONTENEUR PRINCIPAL
  container: {
    paddingHorizontal: 0,        // Marge horizontale
  },

  // ÉCRAN DE CHARGEMENT
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',            // Gris
    textAlign: 'center',
  },

  //  EN-TÊTE DU TABLEAU
  tableHeader: {
    backgroundColor: '#FFFFFF',   // Fond blanc
    borderRadius: 8,             // Coins arrondis
    padding: 16,                 // Padding interne
    marginBottom: 12,            // Marge en bas
    borderWidth: 1,              // Bordure fine
    borderColor: '#E5E7EB',      // Couleur bordure grise
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',           // Semi-gras
    color: '#000000',            // Noir
  },

  //  CONTAINER VIDE (aucun résultat)
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 40,                 // Plus de padding pour centrer
    alignItems: 'center',        // Centrage horizontal
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',            // Gris foncé
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#6B7280',            // Gris plus clair
    textAlign: 'center',
    marginTop: 4,
  },

  //  CARTE INDIVIDUELLE D'UN EMPLOYÉ
  personnelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,            // Coins bien arrondis
    padding: 16,
    marginBottom: 12,            // Espacement entre les cartes
    borderWidth: 1,
    borderColor: '#E5E7EB',
    // Ombre pour effet de profondeur
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,                // Ombre Android
  },

  //  EN-TÊTE DE LA CARTE
  cardHeader: {
    flexDirection: 'row',        // Éléments en ligne
    alignItems: 'flex-start',    // Alignement en haut
    marginBottom: 12,
  },

  //  PHOTO DE PROFIL
  profilePhoto: {
    width: 48,                   // Taille fixe
    height: 48,
    borderRadius: 24,            // Cercle parfait (width/2)
    marginRight: 12,             // Espacement avec le texte
    backgroundColor: '#F3F4F6',  // Couleur de fond par défaut
  },

  // ℹ INFORMATIONS PRINCIPALES
  mainInfo: {
    flex: 1,                     // Prend tout l'espace disponible
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',           // Gras pour le nom
    color: '#000000',
    marginBottom: 2,
  },
  personPosition: {
    fontSize: 13,
    color: '#3B82F6',           // Bleu pour le poste
    fontWeight: '500',
    marginBottom: 2,
  },
  personDepartment: {
    fontSize: 12,
    color: '#6B7280',           // Gris pour le département
  },

  //  BADGE DE STATUT
  statusBadge: {
    paddingHorizontal: 8,        // Padding horizontal
    paddingVertical: 4,          // Padding vertical
    borderRadius: 12,            // Forme de pilule
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',            // Texte blanc sur fond coloré
    fontWeight: '600',
  },

  //  SECTION DÉTAILS
  cardDetails: {
    marginBottom: 12,
  },

  //  LIGNE DE DÉTAIL (icône + texte)
  detailRow: {
    flexDirection: 'row',        // Icône et texte en ligne
    alignItems: 'center',        // Alignement vertical centré
    marginBottom: 6,             // Espacement entre les lignes
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,               // Espacement avec l'icône
    flex: 1,                     // Prend l'espace restant
  },

  //  SECTION STATISTIQUES
  cardStats: {
    flexDirection: 'row',        // Stats en ligne
    justifyContent: 'space-around', // Répartition égale
    backgroundColor: '#F8F9FA',  // Fond gris très clair
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  //  ITEM DE STATISTIQUE INDIVIDUEL
  statItem: {
    alignItems: 'center',        // Centrage vertical
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',           // Très gras pour les chiffres
    color: '#000000',
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },

  //  SECTION COMPÉTENCES
  competencesContainer: {
    borderTopWidth: 1,           // Ligne de séparation en haut
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  competencesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  //  LISTE DES TAGS DE COMPÉTENCES
  competencesList: {
    flexDirection: 'row',        // Tags en ligne
    flexWrap: 'wrap',            // Retour à la ligne si nécessaire
    gap: 6,                      // Espacement entre les tags
  },

  //  TAG INDIVIDUEL DE COMPÉTENCE
  competenceTag: {
    backgroundColor: '#EFF6FF',  // Bleu très clair
    borderColor: '#DBEAFE',      // Bordure bleu clair
    borderWidth: 1,
    borderRadius: 12,            // Forme de pilule
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  competenceText: {
    fontSize: 10,
    color: '#1E40AF',           // Bleu foncé
    fontWeight: '500',
  },
});

export default StaffTable;