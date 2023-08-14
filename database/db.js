import { Sequelize } from 'sequelize';
import dbConfig from '../config/dbConfig.js';
import CountryModel from '../models/countryModel.js';

const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mariadb',
});

export const country = CountryModel(db);

export default db;
