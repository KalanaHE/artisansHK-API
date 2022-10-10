const routes = require('express').Router();
const { errors } = require('celebrate');
const authRoutes = require('./auth.route');
const colorRoutes = require('./color.route');
const artisanRoutes = require('./artisan.route');
const packageSizesRoutes = require('./packageSizes.route');
const productRoutes = require('./product.route');
const rmReleaseRoutes = require('./rmRelease.route');
const productCollectionRoutes = require('./productCollection.route');
const grnProcessRoutes = require('./grnProcess.route');
const reportsRoutes = require('./reports.route');
const villageRoutes = require('./village.route');
const employeeRoutes = require('./employee.route');
const qcRoutes = require('./qc.route');
const statsRoutes = require('./stats.route');

/** HEALTH CHECK */
routes.get(`${process.env.API_VERSION_PREFIX}/`, (req, res) => res.status(200).json({ message: 'service is up and running' }));

routes.use(`${process.env.API_VERSION_PREFIX}/auth`, authRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/color`, colorRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/artisan`, artisanRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/packageSizes`, packageSizesRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/products`, productRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/rmRelease`, rmReleaseRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/productCollection`, productCollectionRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/grn`, grnProcessRoutes);

//admin portal routes
routes.use(`${process.env.API_VERSION_PREFIX}/reports`, reportsRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/villages`, villageRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/employees`, employeeRoutes);
routes.use(`${process.env.API_VERSION_PREFIX}/qc`, qcRoutes);

routes.use(`${process.env.API_VERSION_PREFIX}/stats`, statsRoutes);

routes.use(errors());

module.exports = routes;
