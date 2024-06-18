import express from 'express'
import  {app, port } from './app'
import sequelize from './config/config';

sequelize.sync()
.then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(port, ()=>{
        console.log(`server is listening ${port}`)
    })
})
.catch((error) => {
    console.error('Error during synchronization:', error);
});




// try {
//     //  sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }