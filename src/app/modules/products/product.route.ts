import express from 'express';
import { productController } from './product.controller';


const router = express.Router();
router.post('/create-product', productController.createProduct);
// router.get('/', StudentController.getAllStudents);
// router.delete('/:studentId', StudentController.deleteStudent);
// router.get('/:id', StudentController.getSingleStudents);

export const ProductRoutes = router;