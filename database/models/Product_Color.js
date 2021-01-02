module.exports = (sequelize, DataTypes) => {
    let alias = "Product_Color";
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
        color_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'product_color',
        timestamps: false
    };
    let Product_Color = sequelize.define(alias, cols, config);
    return Product_Color;
}