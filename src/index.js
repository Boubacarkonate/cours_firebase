// Importer la fonction initializeApp depuis le module firebase/app
import { initializeApp } from "firebase/app";

// Importer les fonctions nécessaires pour interagir avec Firestore depuis le module firebase/firestore
import { 
  getDocs,         // Fonction pour obtenir tous les documents d'une collection
  collection,      // Fonction pour référencer une collection Firestore
  getFirestore,    // Fonction pour initialiser une instance Firestore
  onSnapshot,      // Fonction pour écouter les modifications dans une collection
  addDoc,          // Fonction pour ajouter un nouveau document à une collection
  serverTimestamp, // Fonction pour obtenir une horodatage de serveur
  setDoc,          // Fonction pour définir ou remplacer des données pour un document
  doc,             // Fonction pour référencer un document spécifique
  deleteDoc,       // Fonction pour supprimer un document spécifique
  updateDoc,       // Fonction pour mettre à jour un document spécifique
  query,           // Fonction pour créer une requête Firestore
  where,           // Fonction pour spécifier des conditions de filtrage dans une requête
  orderBy,         // Fonction pour spécifier l'ordre de tri dans une requête
  limit,           // Fonction pour limiter le nombre de résultats dans une requête
  collectionGroup  // Fonction pour effectuer une requête sur un groupe de collections
} from "firebase/firestore";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoxfj-dnxERRZAmVyIw18i_-q9krc_ycc",
  authDomain: "fir-demo-2319d.firebaseapp.com",
  projectId: "fir-demo-2319d",
  storageBucket: "fir-demo-2319d.appspot.com",
  messagingSenderId: "738834518891",
  appId: "1:738834518891:web:5d82823d9b3ab7866c322e"
};

// Initialise l'application Firebase avec la configuration firebaseConfig
const app = initializeApp(firebaseConfig); 

// Initialise le service Firestore avec l'application Firebase
const db = getFirestore(app); 

// Référence à la collection "utilisateurs" dans la base de données Firestore
const user = collection(db, "utilisateurs");

// Récupération des documents de la collection "utilisateurs" => mais pas en temps réel(real Time) avec getDocs()
getDocs(user)
    .then((snapshot) => { // Une fois que les documents sont récupérés avec succès
        let recuperer_user_inArray = []; // Initialisation d'un tableau pour stocker les données des utilisateurs récupérés

        // Parcours de chaque document dans le snapshot
        snapshot.docs.forEach((doc) => {
            // Ajout des données de chaque document dans le tableau recuperer_user_inArray
            recuperer_user_inArray.push({ ...doc.data(), id: doc.id }); // On utilise spread operator pour obtenir les données du document et on ajoute l'ID du document
        });

        // Affichage des données des utilisateurs dans la console
        // console.log('lecture de datas mais en temps réel', recuperer_user_inArray);
    });


                            /***********************************************
                             *              AJOUTER UN DOCUMENT
                             **********************************************/

// Référence à la collection "Villes" dans la base de données Firestore
const cities = collection(db, "Villes");    

// Sélection du formulaire HTML avec la classe "ajouter"
const addCityForm = document.querySelector('.ajouter');

// Ajout d'un écouteur d'événements sur le formulaire pour l'événement "submit"
addCityForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire (rechargement de la page)

    // Ajout d'un nouveau document avec un ID généré automatiquement
    addDoc(cities, {
        pays: addCityForm.pays.value, // Valeur du champ "pays" du formulaire
        ville: addCityForm.ville.value, // Valeur du champ "ville" du formulaire
        capitale: addCityForm.capitale.value === 'true' ? 'true' : 'false', // Valeur du champ "capitale" convertie en chaîne 'true' ou 'false'
        created_date: serverTimestamp() // Ajout d'un horodatage côté serveur pour la date de création provenant du firestore
    }).then(() => addCityForm.reset()); // Réinitialisation du formulaire une fois que l'ajout du document est terminé

    // Ajout d'un nouveau document avec un ID personnalisé
    // setDoc(doc(db, "Villes", 'id_Perso'), {
    //     pays: addCityForm.pays.value,
    //     ville: addCityForm.ville.value,
    //     capitale: addCityForm.capitale.value === 'true' ? 'true' : 'false',
    //     created_date: serverTimestamp()
    // }).then(() => addCityForm.reset());

    // console.log('ville ajoutée avec succés avec addDoc() !');

});

                                    
                            /***************************************************************
                             *            RECUPERER UN DOCUMENT EN TEMPS REEL (real time)
                             ***************************************************************/

onSnapshot(cities, (snapshot) => {
    let recuperer_city_inArray = []; // Initialisation d'un tableau pour stocker les données des utilisateurs récupérés

    // Parcours de chaque document dans le snapshot
    snapshot.docs.forEach((doc) => {
        // Ajout des données de chaque document dans le tableau recuperer_user_inArray
        recuperer_city_inArray.push({ ...doc.data(), id: doc.id }); // On utilise spread operator pour obtenir les données du document et on ajoute l'ID du document
    });

    // Affichage des données des utilisateurs dans la console
    console.log('lecture des datas en base de données en temps réel avec onSnapshot()', recuperer_city_inArray);
});


                            /*********************************************
                             *            SUPPRIMER UN DOCUMENT 
                             ************************************************/

// const delecteCityForm = document.querySelector('.suppression');

// delecteCityForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const doc_a_supprimer = doc(db, "Villes", delecteCityForm.id.value);

//     deleteDoc(doc_a_supprimer)
//         .then(() => delecteCityForm.reset());

//         console.log('delete success !');
// })

// Sélection du formulaire de suppression
const deleteCityForm = document.querySelector('.suppression');

// Ajout d'un écouteur d'événements sur la soumission du formulaire
deleteCityForm.addEventListener('submit', (event) => {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();

    // Récupération de l'ID du document à supprimer depuis le champ du formulaire
    const docId = deleteCityForm.id.value;

    // Référence au document à supprimer dans la collection "Villes"
    const docToDelete = doc(db, "Villes", docId);

    // Suppression du document
    deleteDoc(docToDelete)
        .then(() => {
            // Réinitialisation du formulaire après la suppression réussie
            deleteCityForm.reset();
            console.log('Document supprimé avec succès !');
        })
        .catch((error) => {
            // Gestion des erreurs en cas d'échec de la suppression
            console.error('Erreur lors de la suppression du document :', error);
        });
});


                            /*********************************************
                             *            MODIFIER UN DOCUMENT 
                             ************************************************/

// const updateCityForm = document.querySelector('.modifier');

// updateCityForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const doc_a_modifier = doc(db, "Villes", updateCityForm.id.value);

//     updateDoc(doc_a_modifier, { ville: "la ville à jour" })
//         .then(() => updateCityForm.reset());
//         console.log('update success !');
// })


// Sélection du formulaire de mise à jour
const updateCityForm = document.querySelector('.modifier');

// Ajout d'un écouteur d'événements sur la soumission du formulaire
updateCityForm.addEventListener('submit', (event) => {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();

    // Récupération de l'ID du document à mettre à jour depuis le champ du formulaire
    const docId = updateCityForm.id.value;

    // Référence au document à mettre à jour dans la collection "Villes"
    const docToUpdate = doc(db, "Villes", docId);

    // Mise à jour des données du document
    updateDoc(docToUpdate, { ville: "la ville mise à jour" })
        .then(() => {
            // Réinitialisation du formulaire après la mise à jour réussie
            updateCityForm.reset();
            console.log('Document mis à jour avec succès !');
        })
        .catch((error) => {
            // Gestion des erreurs en cas d'échec de la mise à jour
            console.error('Erreur lors de la mise à jour du document :', error);
        });
});


                            /**************************************************************
                             *       LES REQUETES CLOUD FIRESTORE : simples et composées
                             *************************************************************/



    //////////////////// LES REQUETES SIMPLES //////////////////////

//1. Création d'une requête pour récupérer les documents de la collection "Villes" où le champ "pays" est égal à 'RD Congo'
const q1 = query(cities, where("pays", '==', 'Rd Congo'));

//2. Récuperer toutes les villes sauf celles de la RDC
const q2 = query(cities, where("pays", "!=", "Rd Congo"));

//3 Récuperer seulement les villes de la RD Congo et celles du Rwanda
const q3 = query(cities, where("pays", "in", ["Rd Congo", "Rwanda"]));

//4. Récuperer toutes les villes sauf 'Bujumbura', 'Gisenyi', 'Goma'
const q4 = query(
    cities,
    where("ville", "not-in", ["Bujumbura", "Gisenyi", "Goma"])
  );

//5. Récuperer les villes dont la population est superieure à 1M
const q5 = query(cities, where("population", ">", 1000000));

// Écoute des modifications dans les documents qui correspondent à la requête q1
onSnapshot(q5, (snapshot) => {
  let recuperer_city_inArray = []; // Initialisation d'un tableau pour stocker les données des villes récupérées
  // Parcours de chaque document dans le snapshot
  snapshot.docs.forEach((doc) => {
      // Ajout des données de chaque document dans le tableau recuperer_city_inArray
      recuperer_city_inArray.push({ ...doc.data(), id: doc.id }); // On utilise spread operator pour obtenir les données du document et on ajoute l'ID du document
  });

  // Affichage des données des villes dans la console
  // console.log('q1. requête pour obtenir toutes les villes de la RD Congo : ', recuperer_city_inArray);
  // console.log('q2. requête pour obtenir toutes les villes exceptées celles de la RD Congo : ', recuperer_city_inArray);
  // console.log('q3. requête pour obtenir toutes les villes  de la RD Congo et du Rwanda : ', recuperer_city_inArray);
  // console.log('q4. requête pour obtenir récuperer toutes les villes sauf Bujumbura, Gisenyi, Goma  : ', recuperer_city_inArray);
  // console.log('q5. requête pour récuperer les villes dont la population est superieure à 1M  : ', recuperer_city_inArray);

});


//////////////////// LES REQUETES COMPOSEES //////////////////////

//6. Récuperer toutes les villes ajoutées entre le 10 et 30 juillet 2022
// et Arrangez-les selon l'odre decroissant
const q6 = query(
    cities,
    where(
      "dateDajout",
      ">",
      new Date("Jul 10, 2022"),
      where("dateDajout", "<", new Date("Jul 30, 2022")),
      orderBy("dateDajout", "desc")
    )
  );

//7. Récuperer la ville avec comme commune 'Nyarugege'
const q7 = query(cities, where("communes", "array-contains", "Nyarugenge"));    //ps array-contains est un opérateur signant "les éléments contenus dans le tableau"


//8. Récuperer les villes avec comme commune 'Nyarugege', 'Bandale', 'Cyangugu', 'Ibanda'
const q8 = query(
    cities,
    where("communes", "array-contains-any", [               //ps array-contains-any est un opérateur où la propriété demandée contient au moins l'une des valeurs spécifiées
      "Nyarugenge",
      "Bandale",
      "Cyangugu",
      "Ibanda",
    ])
  );

//9. Récuperer les 3 dernieres villes recement ajoutées
const q9 = query(cities, orderBy("dateDajout", "desc"), limit(3));

// => Reqêtes composées
//10.Récuperer toutes les villes de la RD Congo
//dont la population est inferieure à 3M
const q10 = query(
  cities,
  where("pays", "==", "Rd Congo"),              //revoir ajout index cloud firestore
  where("population", "<", 3000000)
);


// Écoute des modifications dans les documents qui correspondent à la requête q1
onSnapshot(q10, (snapshot) => {
    let recuperer_city_inArray = []; // Initialisation d'un tableau pour stocker les données des villes récupérées
    // Parcours de chaque document dans le snapshot
    snapshot.docs.forEach((doc) => {
        // Ajout des données de chaque document dans le tableau recuperer_city_inArray
        recuperer_city_inArray.push({ ...doc.data(), id: doc.id }); // On utilise spread operator pour obtenir les données du document et on ajoute l'ID du document
    });

      // Affichage des données des villes dans la console
    // console.log('q6. Récuperer toutes les villes ajoutées entre le 10 et 30 juillet 2022 dans un ordre décroissant : ', recuperer_city_inArray);
    // console.log('q7. Récuperer la ville avec comme commune Nyarugege : ', recuperer_city_inArray);
    // console.log('q8. Récuperer les villes avec comme commune Nyarugege, Bandale, Cyangugu, Ibanda : ', recuperer_city_inArray);
    console.log('q10. Récuperer toutes les villes de la RD Congo dont la population est inferieure à 3M : ', recuperer_city_inArray);

});
    

/* Requêtes de groupe des collections
   Référence de la sous-collection (NB: ID unique pour les sous-collections sont des collections d'un document existant (créé dans une collection) 
                                            COLLECTION
                                                  |
                                                  ---> Document
                                                            |
                                                            ---> collection(sous-collection)
                                                      
   */

const habitantsRef = collectionGroup(db, "habitants");    

//11. Récuperer tous les habitants disponibles
const q11 = query(habitantsRef);

//12. Récuperer les habitants feminins
const q12 = query(habitantsRef, where("sexe", "==", "F"));

// Écoute des modifications dans les documents qui correspondent à la requête q1
onSnapshot(q12, (snapshot) => {
  let recuperer_city_inArray = []; // Initialisation d'un tableau pour stocker les données des villes récupérées
  // Parcours de chaque document dans le snapshot
  snapshot.docs.forEach((doc) => {
      // Ajout des données de chaque document dans le tableau recuperer_city_inArray
      recuperer_city_inArray.push({ ...doc.data(), id: doc.id }); // On utilise spread operator pour obtenir les données du document et on ajoute l'ID du document
  });

  // console.log('q11. Récuperer tous les habitants disponibles : ', recuperer_city_inArray);
  console.log('q12. Récuperer les habitants feminins : ', recuperer_city_inArray);
});


                              /**************************************************************
                             *                      AUTHENTICATION
                             *************************************************************/

// Initialise l'objet d'authentification avec l'application Firebase  
const auth = getAuth(app);

//// Avec un compte GOOGLE ////////////                         PS: plutôt à utiliser pour des applications publiques

// Sélectionne le bouton de connexion Google dans le DOM
const signInGoogleBtn = document.querySelector('.googleLogin');

// Ajoute un écouteur d'événements pour le clic sur le bouton de connexion Google
signInGoogleBtn.addEventListener('click', () => {
  // Démarre le processus d'authentification avec redirection vers Google
  signInWithRedirect(auth, new GoogleAuthProvider());
  // Affiche un message indiquant que l'authentification est en cours
  console.log('Authentification en cours...');
});

// Écoute les changements d'état d'authentification (connexion/déconnexion)
onAuthStateChanged(auth, (user) => {
  // Affiche dans la console l'état de l'utilisateur (connecté ou null (si déconnecté) )
  console.log("Changement d'état de l'utilisateur : ", user);
});

// Sélectionne le bouton de déconnexion dans le DOM
const logoutBtn = document.querySelector('.logout');

// Ajoute un écouteur d'événements pour le clic sur le bouton de déconnexion
logoutBtn.addEventListener('click', () => {
  // Déconnecte l'utilisateur actuellement connecté
  signOut(auth)
    .then(() => {
      // Affiche un message indiquant que l'utilisateur est déconnecté
      console.log('Utilisateur déconnecté');
    })
    .catch((err) => {
      // En cas d'erreur, affiche le message d'erreur dans la console
      console.log(err.message);
    });
});


////// avec un compte EMAIL et PASSWORD + lien de confirmation ////////////////     PS: bien pour les applications privées

const signupForm = document.querySelector('.signup');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;
  
  createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        console.log("utilisateur inscrit", credentials.user);
        signupForm.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
});