module.exports = (sequelize, DataTypes) => {
    let alias = "Carritos";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        forma_entrega: {
            type: DataTypes.STRING 
        },
        forma_pago: {
            type: DataTypes.STRING
        },
        users_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'carritos',
        timestamps: false
    };
    let Carrito = sequelize.define(alias, cols, config);
    Carrito.associate = (models) => {
        Carrito.belongsTo(models.Users, {
            as: "users",
            foreignKey: "users_id"

        })
    };
    Carrito.associate = (models) => {
        Carrito.belongsTo(models.Product_Carrito, {
            as: "product_carrito",
            foreignKey: "carritos_id"

        })
    }
    return Carrito;
} 