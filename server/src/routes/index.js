const { Router } = require('express');
const countryRoutes = require('./countryRoutes')
const activitiesRoutes = require('./activityRoutes');


const router = Router();
router.use('/countries', countryRoutes);
router.use('/activities', activitiesRoutes);


module.exports = router;