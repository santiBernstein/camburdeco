module.exports = (sequelize, DataTypes) => {
    let alias = "Newsletter";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        email: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName : 'newsletters',
        timestamps: false
    };
    let Newsletter = sequelize.define(alias, cols, config);
    
    return Newsletter;
} 