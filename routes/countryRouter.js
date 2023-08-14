import express from 'express';
import countryController from '../controllers/countryController.js';

const countryRouter = express.Router();

countryRouter.get('/', countryController.getCountry);
countryRouter.get('/:id', countryController.getCountryDetail);
countryRouter.post('/', countryController.postCountry);
countryRouter.put('/:id', countryController.putCountry);
countryRouter.delete('/:id', countryController.deleteCountry);

export default countryRouter;
