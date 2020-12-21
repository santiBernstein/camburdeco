module.exports = (sequelize, DataTypes) => {
    let alias = "Categories";
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
        tableName : 'categories',
        timestamps: false
    };
    let Category = sequelize.define(alias, cols, config);
    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            as: "products",
            foreignKey: "categories_id"

        })
    }
    return Category;
}