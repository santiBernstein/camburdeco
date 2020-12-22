module.exports = (sequelize, DataTypes) => {
    let alias = "Color";
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
        Color.hasMany(models.Product_Color, {
            as: "product_color",
            foreignKey: "color_id"

        })
    }
    return Color;
}