module.exports = (sequelize, DataTypes) => {
    let alias = "Product_Style";
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
        style_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {model: "Style", key: "id"}
        }
    };
    let config = {
        tableName : 'product_style',
        timestamps: false
    };
    let Product_Style = sequelize.define(alias, cols, config);
    return Product_Style;
}