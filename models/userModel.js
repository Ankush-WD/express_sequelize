module.exports=(sequelize, Sequelize)=>{
    const User = sequelize.define('User',{
        id :{
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        email_verified_at:{
            type:Sequelize.DATE
        },
        password:{ 
            type:Sequelize.STRING
        },
        remember_token:{
            type: Sequelize.STRING
        },
        profile_image:{
            type:Sequelize.STRING
        },
        demo:{
            type:Sequelize.STRING
        }        
    },{
        tableName: 'users'
    });

    return User;
};