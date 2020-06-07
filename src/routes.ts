import express, { request, response } from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multerConfig from './config/multer';
import multer from 'multer';
import {celebrate, Joi} from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);
const itemsController = new ItemsController();
const pointController = new PointsController();

// index, show, create, delete

// Items
routes.get('/items', itemsController.index);

// Points
routes.get('/points', pointController.index );
routes.get('/points/:id', pointController.show );
routes.post('/points', 
            upload.single('image'), 
            celebrate({
                body:Joi.object().keys({
                    name: Joi.string().required(),
                    email: Joi.string().required().email(),
                    whatsapp: Joi.number().required(),
                    latitude: Joi.number().required(),
                    longitude: Joi.number().required(),
                    city: Joi.string().required(),
                    uf: Joi.string().required(),
                    items: Joi.string().required(),
                    })
            }),
            pointController.create );

    
    

export default routes;