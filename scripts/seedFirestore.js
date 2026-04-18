import app from '../src/firebase/firebase.config.js';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

const db = getFirestore(app);

const MOCK_PRODUCTS = [
  { id: 1, title: "Bolso", price: "19.99", rate: 4.5, image: "01_item.jpg" },
  { id: 2, title: "Morral", price: "24.99", rate: 4.8, image: "02_item.jpg" },
  { id: 3, title: "Cartera", price: "12.50", rate: 4.2, image: "03_item.jpg" },
  { id: 4, title: "Maletín", price: "45.00", rate: 4.9, image: "04_item.jpg" },
  { id: 5, title: "Cartera", price: "100.00", rate: 3.8, image: "05_item.jpg" },
];

async function seedProducts() {
  console.log('Starting seed process...');
  const productsRef = collection(db, 'products');

  try {
    for (const product of MOCK_PRODUCTS) {
      // Usamos el ID del mock como ID del documento (convertido a string) 
      // para mantener el orden, o podríamos usar id aleatorios.
      // Usaremos id como string para tener control exacto
      const docRef = doc(productsRef, product.id.toString());
      await setDoc(docRef, product);
      console.log(`Seeded Product: ${product.title}`);
    }
    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database: ', error);
    process.exit(1);
  }
}

seedProducts();
