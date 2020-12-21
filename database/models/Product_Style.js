module.exports = (sequelize, DataTypes) => {
    let alias = "Products_Styles";
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
        styles_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'products_styles',
        timestamps: false
    };
    let Product_Style = sequelize.define(alias, cols, config);
    Product_Style.associate = (models) => {
        Product_Style.hasMany(models.Product, {
            as: "product",
            foreignKey: "products_id"

        })
    };
    Product_Style.associate = (models) => {
        Product_Style.hasMany(models.Style, {
            as: "style",
            foreignKey: "styles_id"

        })
    }
    return Product_Style;
}