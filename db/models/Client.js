const sequelize = require('sequelize');
// const db = require ("../models")

module.exports = (sequelize, DataTypes) => {
    const alias = 'Client';


    const config = {
        timestamps: false,
        tableName: 'clients'
    }

    const columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrements: true,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_image: DataTypes.STRING,
        id_category: DataTypes.INTEGER
    }

    const Client = sequelize.define(alias, columns, config);

    Client.associate = function(allModels){
        Client.belongsTo(allModels.Category, {
            as: "client_category",
            foreignKey: "id_category"
       });

        Client.hasMany(allModels.Cart, {
            as: "client_carts",
            foreignKey: "id_client"
        });
       }


    return Client
};