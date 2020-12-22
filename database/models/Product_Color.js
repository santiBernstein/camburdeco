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
        tableName : 'products_colors',
        timestamps: false
    };
    let Product_Color = sequelize.define(alias, cols, config);
    Product_Color.associate = (models) => {
        Product_Color.hasMany(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
        Product_Color.hasMany(models.Color, {
            as: "color",
            foreignKey: "color_id"

        })
    }
    return Product_Color;
}