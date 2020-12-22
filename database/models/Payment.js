module.exports = (sequelize, DataTypes) => {
    let alias = "Payment";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true, 
        },
        type: {
            type: DataTypes.STRING 
        },
        number: {
            type: DataTypes.INTEGER
        },
        profile_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    };
    let config = {
        tableName : 'payments',
        timestamps: false
    };
    let Payment = sequelize.define(alias, cols, config);
    Payment.associate = (models) => {
        Payment.belongsTo(models.Profile, {
            as: "profiles",
            foreignKey: "profile_id"

        })
    }
    return Payment;
} 