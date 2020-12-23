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
        },
        style_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'product_style',
        timestamps: false
    };
    let Product_Style = sequelize.define(alias, cols, config);
    // Product_Style.associate = (models) => {
    //       Product_Style.hasMany(models.Product, {
    //           as: "product",
    //           foreignKey: "product_id"
    //       })
    //     Product_Style.hasMany(models.Style, {
    //         as: "style",
    //         foreignKey: "style_id"
    //     })
    //}
    return Product_Style;
}