module.exports = (sequelize, DataTypes) => {
    let alias = "Carrito";
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
        user_id: {
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
        Carrito.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        })
        Carrito.belongsToMany(models.Product, {
            as: "product",
            foreignKey: "carrito_id",
            through: "product_carrito",
            otherKey: "product_id",
            timestamps: false
        })
    }
    return Carrito;
} 