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
    updateDoc
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




                        
