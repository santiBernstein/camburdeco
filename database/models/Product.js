module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        name: {
            type: DataTypes.STRING 
        },
        description: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.FLOAT
        },
        img: {
            type: DataTypes.STRING
        },
        top: {
            type: DataTypes.INTEGER
        },
        category_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'products',
        timestamps: false
    };
    let Product = sequelize.define(alias, cols, config);
    Product.associate = (models) => {
          Product.belongsToMany(models.Product_Carrito, {
              as: "carrito",
              foreignKey: "product_id",
              through: "product_carrito"

          })
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"

        })
         Product.belongsToMany(models.Style, {
             as: "style",
             foreignKey: "product_id",
             through: "product_style"

         })
         Product.belongsToMany(models.Product_Color, {
             as: "color",
             foreignKey: "product_id",
             through: "product_color"

         })
    }
    return Product;
}