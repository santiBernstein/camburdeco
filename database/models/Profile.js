module.exports = (sequelize, DataTypes) => {
    let alias = "Profile";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        first_name: {
            type: DataTypes.STRING 
        },
        last_name: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        pais: {
            type: DataTypes.STRING
        },
        info_id: {
            type: DataTypes.INTEGER,
        },
        users_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'profiles',
        timestamps: false
    };
    let Profile = sequelize.define(alias, cols, config);
    Profile.associate = (models) => {
        Profile.belongsTo(models.Users, {
            as: "users",
            foreignKey: "user_id"

        })
    };
    Profile.associate = (models) => {
        Profile.belongsTo(models.Payments, {
            as: "payments",
            foreignKey: "profile_id"

        })
    }
    return Profile;
}