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
            references: {model: "Product", key: "id"}
        },
        carrito_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {model: "Carrito", key: "id"}
        }
    };
    let config = {
        tableName : 'product_carrito',
        timestamps: false
    };
    let Product_carrito = sequelize.define(alias, cols, config);
    return Product_carrito;
}