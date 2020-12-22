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
        Style.hasMany(models.Product_Style, {
            as: "product_style",
            foreignKey: "style_id"

        })
    }
    return Style;
}