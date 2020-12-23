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
        Color.belongsToMany(models.Product, {
            as: "product",
            foreignKey: "color_id",
            through: "product_color"

        })
    }
    return Color;
}