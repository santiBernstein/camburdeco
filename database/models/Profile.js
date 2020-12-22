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
<<<<<<< HEAD
            foreignKey: "users_id"
=======
            foreignKey: "user_id"
>>>>>>> 5e5d52969f888b4621344bb4a2319500c2a43c16

        })
    };
    Profile.associate = (models) => {
        Profile.belongsTo(models.Payments, {
            as: "payments",
<<<<<<< HEAD
            foreignKey: "profiles_id"
=======
            foreignKey: "profile_id"
>>>>>>> 5e5d52969f888b4621344bb4a2319500c2a43c16

        })
    }
    return Profile;
}