const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    batting_style: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bowling_style: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_birth: {
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
    tableName: 'players',
});


module.exports = Player;