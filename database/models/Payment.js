module.exports = (sequelize, DataTypes) => {
    let alias = "Payments";
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
        info_id: {
            type: DataTypes.INTEGER
        },
        profiles_id: {
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
        Payment.belongsTo(models.Profiles, {
            as: "profiles",
            foreignKey: "profiles_id"

        })
    }
    return Payment;
} 