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
import { productService } from '../services/productService.js';

const db = getFirestore(firebase);

class ProductController {
  async createProduct(req, res, next) {
    try {
      await productService.create(req.body);
      res.status(200).send('product created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await productService.getAll();

      if (!products.length) {
        res.status(400).send('No Products found');
      } else {
        res.status(200).send(products);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  async getProduct(req, res, next) {
    try {
      const id = req.params.id;
      const data = await productService.getOne(id);
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send('product not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      await productService.updateOne(id, data);
      res.status(200).send('product updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      await productService.deleteOne(id);
      res.status(200).send('product deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new ProductController();
