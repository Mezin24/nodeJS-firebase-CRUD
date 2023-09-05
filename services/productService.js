import firebase from '../firebase.js';
import Product from '../models/productModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
const db = getFirestore(firebase);

class ProductService {
  async create(product) {
    return await addDoc(collection(db, 'products'), product);
  }

  async getAll() {
    const products = await getDocs(collection(db, 'products'));
    const productArray = [];

    products.forEach((doc) => {
      const product = new Product(
        doc.id,
        doc.data().name,
        doc.data().price,
        doc.data().retailer,
        doc.data().amountInStock
      );
      productArray.push(product);
    });

    return productArray;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('No id');
    }
    const product = doc(db, 'products', id);
    const data = await getDoc(product);
    return data.data();
  }

  async updateOne(id, data) {
    if (!id | !data) {
      throw new Error('No id or data');
    }
    const product = doc(db, 'products', id);
    return await updateDoc(product, data);
  }

  async deleteOne(id) {
    if (!id) {
      throw new Error('No id');
    }
    await deleteDoc(doc(db, 'products', id));
  }
}

export const productService = new ProductService();
