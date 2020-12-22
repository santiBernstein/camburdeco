module.exports = (sequelize, DataTypes) => {
    let alias = "Colors";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        name: {
            type: DataTypes.STRING 
        }
    };
    let config = {
        tableName : 'colors',
        timestamps: false
    };
    let Color = sequelize.define(alias, cols, config);
    Color.associate = (models) => {
        Product_Color.hasMany(models.Product_Color, {
            as: "product_color",
            foreignKey: "colors_id"

        })
    }
    return Color;
}