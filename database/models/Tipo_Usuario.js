module.exports = (sequelize, DataTypes) => {
    let alias = "Tipo_Usuario";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        userName: {
            type: DataTypes.STRING 
        }
    };
    let config = {
        tableName : 'tipos_usuarios',
        timestamps: false
    };
    let Tipo_Usuario = sequelize.define(alias, cols, config);
    Tipo_Usuario.associate = (models) => {
        Tipo_Usuario.hasMany(models.User, {
            as: "users",
            foreignKey: "tipo_usuario_id"

        })
    }
    return Tipo_Usuario;
} 