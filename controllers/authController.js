const db = require("../models/index.js");
const { SALT_ROUND, JWT_KEY, REFRESH_SECRET } = require("../config/index");
const registerSchema = require("../validations/registerValidation");
const loginSchema = require("../validations/loginValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomErrorHandler = require('../service/customeErrorHandler');
const User = db.users;

const authController = {
  async register(req, res, next) {
    let { name, email, password } = req.body;
    const { error } = registerSchema.validate({ name, email, password });

    if (error) {
      return next(error);
    }

    const isexist = await User.count({ where: { email: email } });
    if (isexist) {
      return next(new Error("User already exists"));
    }

    try {
      console.log("eee workign");
      password = await bcrypt.hash(password, parseInt(SALT_ROUND));
      let user = await User.create({ name, email, password });

      // access token
      const access_token = jwt.sign(
        { id: user.id, name: user.name },
        JWT_KEY,
        { expiresIn: "1h" }
      );
      // refresh key
      const refresh_token = jwt.sign(
        { id: user.id, name: user.name },
        REFRESH_SECRET,
        { expiresIn: "1y" }
      );

      user = { ...user.dataValues, access_token, refresh_token };

      res.status(200).json({ data: user });
    } catch (err) {
      return next(err);
    }
  },
  async login(req, res, next) {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return next(error);
    }

    try {
      const where = { email: email };
      let user = await User.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: where,
      });

      if (user) {
        const is_verifed = await bcrypt.compare(password, user.password);
        if (is_verifed) {
            // access token
            const access_token = jwt.sign({ id: user.id, name: user.name }, JWT_KEY,{ expiresIn: '1h' });
            // refresh key
            const refresh_token = jwt.sign({ id: user.id, name: user.name }, REFRESH_SECRET,{ expiresIn: '1y' });

            user = { ...user.dataValues ,access_token,refresh_token};
            return res.status(200).json({ data: user });
        }

        next( CustomErrorHandler.userNotFound(200,"email and password are not valid"));
      }
      
      next(new Error("No user found"));
    } catch (err) {
      next(err);
    }
    
    /*  bcrypt.compare(password, hash) */
  },
};

module.exports = authController;
