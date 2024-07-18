const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coach: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    founded: {
        type: DataTypes.DATE,
        allowNull: true,
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
    tableName: 'teams',
});


module.exports = Team;