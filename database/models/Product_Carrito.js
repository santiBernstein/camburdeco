module.exports = (sequelize, DataTypes) => {
    let alias = "Product_Carrito";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        product_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        carrito_id: {
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
            foreignKey: "carrito_id"

        })
        Product_carrito.hasMany(models.Product, {
            as: "product",
            foreignKey: "products_id"

        })
    }
    return Product_carrito;
}