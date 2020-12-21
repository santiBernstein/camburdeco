module.exports = (sequelize, DataTypes) => {
    let alias = "Products_Colors";
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
        colors_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'products_colors',
        timestamps: false
    };
    let Product_Color = sequelize.define(alias, cols, config);
    Product_Color.associate = (models) => {
        Product_Color.hasMany(models.Product, {
            as: "product",
            foreignKey: "products_id"

        })
    };
    Product_Color.associate = (models) => {
        Product_Color.hasMany(models.Color, {
            as: "color",
            foreignKey: "colors_id"

        })
    }
    return Product_Color;
}