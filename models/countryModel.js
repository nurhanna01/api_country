import { DataTypes } from 'sequelize';
const CountryModel = (sequelize) =>
  sequelize.define('country', {
    id: {
      type: DataTypes.UUID,
      //   primary,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    capital: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

export default CountryModel;
