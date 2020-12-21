module.exports = (sequelize, DataTypes) => {
    let alias = "Products";
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
        categories_id: {
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
        Product.belongsTo(models.Product_Carrito, {
            as: "product_carrito",
            foreignKey: "products_id"

        })
    };
    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categories_id"

        })
    };
    Product.associate = (models) => {
        Product.belongsTo(models.Product_Style, {
            as: "product_style",
            foreignKey: "products_id"

        })
    };
    Product.associate = (models) => {
        Product.belongsTo(models.Product_Color, {
            as: "product_color",
            foreignKey: "products_id"

        })
    }
    return Product;
}