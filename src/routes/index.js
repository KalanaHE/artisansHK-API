const routes = require('express').Router();
const { errors } = require('celebrate');
const authRoutes = require('./auth.route');
const colorRoutes = require('./color.route')
const artisanRoutes = require('./artisan.route')

/** HEALTH CHECK */
routes.get(`${process.env.API_VERSION_PREFIX}/`, (req, res) => res.status(200).json({ message: 'service is up and running' }));

routes.use(`${process.env.API_VERSION_PREFIX}/auth`, authRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/color`, colorRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/artisan`, artisanRoutes);





routes.use(errors());

module.exports = routes;
