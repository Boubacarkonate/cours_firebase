//Ajouter un dataset dans BK collection "Villes"
// Promise.all([                                            //La méthode Promise.all() est utilisée pour exécuter plusieurs promesses en parallèle et attendre leur résolution
//     setDoc(doc(cities, "KIN"), {
//         pays: "Rd Congo",
//         ville: "Kinshasa",
//         capitale: true,
//         dateDajout: new Date("Jul 1, 2022"),
//         population: 15000000,
//         communes: [
//         "Gombe",
//         "Bandale",
//         "Kinshasa",
//         "LingwaBK",
//         "Limete",
//         "Ngaliema",
//         ],
//     }),
//     setDoc(doc(cities, "BK"), {
//         pays: "Rd Congo",
//         ville: "Bukavu",
//         capitale: false,
//         dateDajout: new Date("Jul 6, 2022"),
//         population: 2000000,
//         communes: ["Ibanda", "Kadutu", "Bagira"],
//     }),
//     setDoc(doc(cities, "DEGO"), {
//         pays: "Rd Congo",
//         ville: "Goma",
//         capitale: false,
//         dateDajout: new Date("Jul 9, 2022"),
//         population: 1000000,
//         communes: ["Goma", "Karisimbi"],
//     }),
//     setDoc(doc(cities, "BJ"), {
//         pays: "Burundi",
//         ville: "Bujumbura",
//         capitale: false,
//         dateDajout: new Date("Jul 15, 2022"),
//         population: 1500000,
//         communes: ["Ntahangwa", "Mukazi", "Muha"],
//     }),
//     setDoc(doc(cities, "GTG"), {
//         pays: "Burundi",
//         ville: "Gitega",
//         capitale: true,
//         dateDajout: new Date("Jul 17, 2022"),
//         population: 130000,
//         communes: ["Magara", "Nyamugari", "Rutonde"],
//     }),
//     setDoc(doc(cities, "KGL"), {
//         pays: "Rwanda",
//         ville: "Kigali",
//         capitale: true,
//         dateDajout: new Date("Jul 28, 2022"),
//         population: 1500000,
//         communes: ["Gasabo", "Kicukiro", "Nyarugenge"],
//     }),
//     setDoc(doc(cities, "GSG"), {
//         pays: "Rwanda",
//         ville: "Gisenyi",
//         capitale: false,
//         dateDajout: new Date("Jul 18, 2022"),
//         population: 160000,
//         communes: ["Kibuye", "Cyangugu"],
//     }),
//     setDoc(doc(cities, "NBO"), {
//         pays: "Kenya",
//         ville: "Nairobi",
//         capitale: true,
//         dateDajout: new Date("Jul 10, 2022"),
//         population: 4000000,
//         communes: [
//         "WestBKnds",
//         "Dagoretti",
//         "BKngata",
//         "Kamukunji",
//         "Embakasi",
//         "Njiru",
//         "Kakadara",
//         ],
//     }),
//     setDoc(doc(cities, "MBS"), {
//         pays: "Kenya",
//         ville: "Mombasa",
//         capitale: false,
//         dateDajout: new Date("Jul 3, 2022"),
//         population: 120800,
//         communes: ["Changwaniwe", "Kisauni", "Koni", "Lokini"],
//     }),
//     ])
//     .then(() => console.log("Données 'Villes' ajoutées avec succès"))
//     .catch((error) => console.log(error.message));


// //Ajouter un dataset dans BK sous-collection "habitants"
// Promise.all([
//     addDoc(collection(cities, "KIN", "habitants"), {
//       noms: "Patrick Bashizi",
//       age: "35 ans",
//       sexe: "M",
//     }),
//     addDoc(collection(cities, "KIN", "habitants"), {
//       noms: "Odette Kavira",
//       age: "32 ans",
//       sexe: "F",
//     }),
//     addDoc(collection(cities, "BK", "habitants"), {
//       noms: "Alain Cisirika",
//       age: "27 ans",
//       sexe: "M",
//     }),
//     addDoc(collection(cities, "BK", "habitants"), {
//       noms: "Josephine Romana",
//       age: "22 ans",
//       sexe: "F",
//     }),
//     addDoc(collection(cities, "DEGO", "habitants"), {
//       noms: "Lens Mutombo",
//       age: "30 ans",
//       sexe: "M",
//     }),
//     addDoc(collection(cities, "DEGO", "habitants"), {
//       noms: "Josephine Ndeze",
//       age: "23 ans",
//       sexe: "F",
//     }),
//     addDoc(collection(cities, "BJ", "habitants"), {
//       noms: "Jean Lionel",
//       age: "28 ans",
//       sexe: "M",
//     }),
//     addDoc(collection(cities, "GTG", "habitants"), {
//       noms: "Chouella Kayonga",
//       age: "23 ans",
//       sexe: "F",
//     }),
//     addDoc(collection(cities, "KGL", "habitants"), {
//       noms: "Cynthia React",
//       age: "24 ans",
//       sexe: "F",
//     }),
//     addDoc(collection(cities, "GSG", "habitants"), {
//       noms: "Esther Android",
//       age: "26 ans",
//       sexe: "M",
//     }),
//     addDoc(collection(cities, "NBO", "habitants"), {
//       noms: "Tabitha CrowSource",
//       age: "29 ans",
//       sexe: "F",
//     }),
//     addDoc(collection(cities, "MBS", "habitants"), {
//       noms: "Wayne Angular",
//       age: "30 ans",
//       sexe: "M",
//     }),
//   ])
//     .then(() => console.log("Données 'habitants' ajoutées avec succès"))
//     .catch((error) => console.log(error.message));
