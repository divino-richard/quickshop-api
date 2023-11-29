import express, { Request, Response } from 'express'; 
import multer from 'multer';
import { authorization } from '../middleware/authMiddleware';
import { productValidator } from '../middleware/validators/product.validator';
import product from '../controller/product.controller';
import {ROOT_DIR} from '../../server';
import customerReview from '../controller/customerReview.controller';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${ROOT_DIR}/uploads/products`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const splitedName = file.originalname.split('.');
      const fileExtension = splitedName[splitedName.length-1];
      const newFileName = 'product' + '-' + uniqueSuffix + '.' + fileExtension;
      cb(null, newFileName);
    }
})
const upload = multer({ storage: storage })

router.get('/all/:_limits/:_offset',
    (req: Request, res: Response) => {
    product.getAll(req, res);
});

router.get('/all/:userId',
    authorization(['SELLER', 'ADMIN']),
    (req: Request, res: Response) => {

    product.getAllByUserId(req, res);
});

router.get('/:_id', (req: Request, res: Response) => {
    product.getById(req, res);
});

router.get('/search/:_like', (req: Request, res: Response) => {
    product.search(req, res);
})

router.get('/review/:id',
    (req: Request, res: Response) => {
    customerReview.getAllByProductId(req, res);
});

router.post('/',
    authorization(['SELLER', 'ADMIN']),
    upload.array('product_images', 1),
    productValidator,
    (req: Request, res: Response) => {

    product.create(req, res);
});

router.put('/:id',
    authorization(['SELLER', 'ADMIN']),
    upload.array('product_images', 1),
    productValidator,
    (req: Request, res: Response) => {

    product.update(req, res);
});

router.delete('/:id', 
    authorization(['SELLER', 'ADMIN']),
    (req: Request, res: Response) => {

    product.delete(req, res);
});

export default router;
