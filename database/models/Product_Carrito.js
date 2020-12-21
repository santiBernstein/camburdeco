module.exports = (sequelize, DataTypes) => {
    let alias = "Products_Carritos";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        products_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        carritos_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'products_carritos',
        timestamps: false
    };
    let Product_carrito = sequelize.define(alias, cols, config);
    Product_carrito.associate = (models) => {
        Product_carrito.hasMany(models.Carrito, {
            as: "carrito",
            foreignKey: "carritos_id"

        })
    };
    Product_carrito.associate = (models) => {
        Product_carrito.hasMany(models.Product, {
            as: "product",
            foreignKey: "products_id"

        })
    }
    return Product_carrito;
}