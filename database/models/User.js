module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        user_name: {
            type: DataTypes.STRING 
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        tipo_usuario: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'users',
        timestamps: false
    };
    let User = sequelize.define(alias, cols, config);
    User.associate = (models) => {
        User.belongsTo(models.Tipo_Usuario, {
            as: "tiposUsuarios",
            foreignKey: "tipo_usuario_id"

        })
        User.belongsTo(models.Profile, {
            as: "profiles",
            foreignKey: "user_id"

        })
        User.hasMany(models.Carrito, {
            as: "carritos",
            foreignKey: "user_id"

        })
    };
    return User;
} 