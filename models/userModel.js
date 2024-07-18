const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const User = sequelize.define('User', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  mobile: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  role: {
      type: DataTypes.ENUM('admin', 'coach', 'player', 'team'),
  },
  created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
  },
  updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
  tableName: 'users',
});


module.exports = User;