const express =require('express');
const { APP_PORT } = require('./config/index.js');
const authRoutes = require('./routes/auth.js');
const db = require("./models/index.js");
const errorHandler =require('./middlewares/errorHandler');

const app   = express();
const port  = process.env.PORT || APP_PORT;
app.use(express.json());

app.use('/v1/auth/', authRoutes);

app.use('/', (req, res, next) => {
    res.send(`
  <h1>Welcome to blog Rest APIs</h1>
  You may contact me <a href="ankush">here</a>
  Or You may reach out to me for any question related to this Apis: codersgyan@gmail.com
  `);
});

// Handling Errors
app.use(errorHandler);

db.sequelize.sync().then(() => {
    app.listen(port,()=> console.log(`Listening port on ${port}`));
}).catch((err) => {
  console.log("Failed to sync db: " + err.message);
});
