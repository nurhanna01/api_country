import { country } from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';

const countryController = {
  getCountry: async (req, res) => {
    try {
      const country_data = await country.findAll();
      res.json({
        status: 'success',
        statusCode: 200,
        message: 'Success get all country',
        data: country_data,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getCountryDetail: async (req, res) => {
    try {
      const country_detail = await country.findByPk(req.params.id);
      console.log(country_detail);
      if (country_detail) {
        res.json({
          status: 'success',
          statusCode: 200,
          message: 'Success get country details',
          data: country_detail,
        });
      } else {
        res.json({
          status: 'error',
          statusCode: 404,
          message: 'Country not found',
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  postCountry: async (req, res) => {
    try {
      const { name, capital } = req.body;
      if (!name) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'Name is required',
        });
      }
      const checkDuplicateName = await country.findOne({ where: { name: name } });
      //   console.log(checkDuplicateName);
      if (checkDuplicateName) {
        return res.json({
          status: 'error',
          statusCode: 400,
          message: 'Country name already exists',
        });
      }
      const newCountry = {
        id: uuidv4(),
        name: name,
        capital: capital || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createCountry = await country.create(newCountry);
      res.json({
        status: 'success',
        statusCode: 201,
        message: 'Country created successfully',
        data: createCountry,
      });
    } catch (err) {
      res.json({
        status: 'error',
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },

  putCountry: async (req, res) => {
    try {
      const { name, capital } = req.body;
      if (!name) {
        return res.status(400).json({
          status: 'error',
          statusCode: 400,
          message: 'Name is required',
        });
      }
      const country_update = await country.findByPk(req.params.id);
      if (!country_update) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: 'Country not found',
        });
      }

      const checkDuplicateName = await country.findOne({ where: { name: name } });
      console.log('tes', name);

      if (checkDuplicateName) {
        return res.json({
          status: 'error',
          statusCode: 400,
          message: 'Country name already exists',
        });
      }

      const updateData = await country.update(
        { name: name, capital: capital },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (updateData === 1) {
        res.json({
          status: 'success',
          statusCode: 201,
          message: 'Country updated successfully',
        });
      }
    } catch (err) {
      res.json({
        status: 'error',
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },

  deleteCountry: async (req, res) => {
    try {
      const deleteCountry = await country.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (deleteCountry === 0) {
        res.json({
          status: 'error',
          statusCode: 400,
          message: 'Country not found',
        });
      } else {
        res.json({
          status: 'success',
          statusCode: 200,
          message: 'Success delete country',
        });
      }
    } catch (err) {
      res.json({
        status: 'error',
        statusCode: 500,
        message: err,
      });
    }
  },
};
export default countryController;
