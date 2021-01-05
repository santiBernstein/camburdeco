module.exports = (sequelize, DataTypes) => {
    let alias = "Style";
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
        tableName : 'styles',
        timestamps: false
    };
    let Style = sequelize.define(alias, cols, config);
    Style.associate = (models) => {
        Style.belongsToMany(models.Product, {
            as: "product",
            foreignKey: "style_id",
            through: "product_style",
            otherKey: "product_id",
            timestamps: "false"

        })
    }
    return Style;
}