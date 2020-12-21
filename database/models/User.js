module.exports = (sequelize, DataTypes) => {
    let alias = "Users";
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
        tipos_usuarios: {
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
        User.belongsTo(models.Tipos_Usuarios, {
            as: "tiposUsuarios",
            foreignKey: "tipos_usuarios"

        })
    };
    User.associate = (models) => {
        User.belongsTo(models.Profiles, {
            as: "profiles",
            foreignKey: "users_id"

        })
    };
    User.associate = (models) => {
        User.hasMany(models.Carrito, {
            as: "carritos",
            foreignKey: "users_id"

        })
    };
    return User;
} 