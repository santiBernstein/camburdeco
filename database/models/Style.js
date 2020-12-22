module.exports = (sequelize, DataTypes) => {
    let alias = "Styles";
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
            foreignKey: "styles_id"

        })
    }
    return Style;
}