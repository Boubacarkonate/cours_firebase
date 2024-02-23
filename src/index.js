// Importer la fonction initializeApp depuis le module firebase/app
import { initializeApp } from "firebase/app";

// Importer les fonctions nécessaires pour interagir avec Firestore depuis le module firebase/firestore
import { 
    getDocs,         // Fonction pour obtenir tous les documents d'une collection
    collection,      // Fonction pour référencer une collection Firestore
    getFirestore,    // Fonction pour initialiser une instance Firestore
    onSnapshot,       // Fonction pour écouter les modifications dans une collection
    addDoc,
    serverTimestamp,
    setDoc,
    doc,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    collectionGroup
} from "firebase/firestore";


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

    console.log('ville ajoutée avec succés avec addDoc() !');

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

const delecteCityForm = document.querySelector('.suppression');

delecteCityForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const doc_a_supprimer = doc(db, "Villes", delecteCityForm.id.value);

    deleteDoc(doc_a_supprimer)
        .then(() => delecteCityForm.reset());

        console.log('delete success !');
})


                            /*********************************************
                             *            MODIFIER UN DOCUMENT 
                             ************************************************/

const updateCityForm = document.querySelector('.modifier');

updateCityForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const doc_a_modifier = doc(db, "Villes", updateCityForm.id.value);

    updateDoc(doc_a_modifier, { ville: "la ville à jour" })
        .then(() => updateCityForm.reset());
        console.log('update success !');
})


                            /**************************************************************
                             *            LES REQUETES CLOUD FIRESTORE : simples et composées
                             *************************************************************/

//Ajouter un dataset dans BK collection "Villes"
Promise.all([
    setDoc(doc(cities, "KIN"), {
        pays: "Rd Congo",
        ville: "Kinshasa",
        capitale: true,
        dateDajout: new Date("Jul 1, 2022"),
        population: 15000000,
        communes: [
        "Gombe",
        "Bandale",
        "Kinshasa",
        "LingwaBK",
        "Limete",
        "Ngaliema",
        ],
    }),
    setDoc(doc(cities, "BK"), {
        pays: "Rd Congo",
        ville: "Bukavu",
        capitale: false,
        dateDajout: new Date("Jul 6, 2022"),
        population: 2000000,
        communes: ["Ibanda", "Kadutu", "Bagira"],
    }),
    setDoc(doc(cities, "DEGO"), {
        pays: "Rd Congo",
        ville: "Goma",
        capitale: false,
        dateDajout: new Date("Jul 9, 2022"),
        population: 1000000,
        communes: ["Goma", "Karisimbi"],
    }),
    setDoc(doc(cities, "BJ"), {
        pays: "Burundi",
        ville: "Bujumbura",
        capitale: false,
        dateDajout: new Date("Jul 15, 2022"),
        population: 1500000,
        communes: ["Ntahangwa", "Mukazi", "Muha"],
    }),
    setDoc(doc(cities, "GTG"), {
        pays: "Burundi",
        ville: "Gitega",
        capitale: true,
        dateDajout: new Date("Jul 17, 2022"),
        population: 130000,
        communes: ["Magara", "Nyamugari", "Rutonde"],
    }),
    setDoc(doc(cities, "KGL"), {
        pays: "Rwanda",
        ville: "Kigali",
        capitale: true,
        dateDajout: new Date("Jul 28, 2022"),
        population: 1500000,
        communes: ["Gasabo", "Kicukiro", "Nyarugenge"],
    }),
    setDoc(doc(cities, "GSG"), {
        pays: "Rwanda",
        ville: "Gisenyi",
        capitale: false,
        dateDajout: new Date("Jul 18, 2022"),
        population: 160000,
        communes: ["Kibuye", "Cyangugu"],
    }),
    setDoc(doc(cities, "NBO"), {
        pays: "Kenya",
        ville: "Nairobi",
        capitale: true,
        dateDajout: new Date("Jul 10, 2022"),
        population: 4000000,
        communes: [
        "WestBKnds",
        "Dagoretti",
        "BKngata",
        "Kamukunji",
        "Embakasi",
        "Njiru",
        "Kakadara",
        ],
    }),
    setDoc(doc(cities, "MBS"), {
        pays: "Kenya",
        ville: "Mombasa",
        capitale: false,
        dateDajout: new Date("Jul 3, 2022"),
        population: 120800,
        communes: ["Changwaniwe", "Kisauni", "Koni", "Lokini"],
    }),
    ])
    .then(() => console.log("Données 'Villes' ajoutées avec succès"))
    .catch((error) => console.log(error.message));


//Ajouter un dataset dans BK sous-collection "habitants"
Promise.all([
    addDoc(collection(cities, "KIN", "habitants"), {
      noms: "Patrick Bashizi",
      age: "35 ans",
      sexe: "M",
    }),
    addDoc(collection(cities, "KIN", "habitants"), {
      noms: "Odette Kavira",
      age: "32 ans",
      sexe: "F",
    }),
    addDoc(collection(cities, "BK", "habitants"), {
      noms: "Alain Cisirika",
      age: "27 ans",
      sexe: "M",
    }),
    addDoc(collection(cities, "BK", "habitants"), {
      noms: "Josephine Romana",
      age: "22 ans",
      sexe: "F",
    }),
    addDoc(collection(cities, "DEGO", "habitants"), {
      noms: "Lens Mutombo",
      age: "30 ans",
      sexe: "M",
    }),
    addDoc(collection(cities, "DEGO", "habitants"), {
      noms: "Josephine Ndeze",
      age: "23 ans",
      sexe: "F",
    }),
    addDoc(collection(cities, "BJ", "habitants"), {
      noms: "Jean Lionel",
      age: "28 ans",
      sexe: "M",
    }),
    addDoc(collection(cities, "GTG", "habitants"), {
      noms: "Chouella Kayonga",
      age: "23 ans",
      sexe: "F",
    }),
    addDoc(collection(cities, "KGL", "habitants"), {
      noms: "Cynthia React",
      age: "24 ans",
      sexe: "F",
    }),
    addDoc(collection(cities, "GSG", "habitants"), {
      noms: "Esther Android",
      age: "26 ans",
      sexe: "M",
    }),
    addDoc(collection(cities, "NBO", "habitants"), {
      noms: "Tabitha CrowSource",
      age: "29 ans",
      sexe: "F",
    }),
    addDoc(collection(cities, "MBS", "habitants"), {
      noms: "Wayne Angular",
      age: "30 ans",
      sexe: "M",
    }),
  ])
    .then(() => console.log("Données 'habitants' ajoutées avec succès"))
    .catch((error) => console.log(error.message));


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
                                                  |--
                                                  Document
                                                    |---
                                                      collection(sous-collection)
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

