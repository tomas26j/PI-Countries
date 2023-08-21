const { Router } = require('express');
const {Activity,Country} = require('../db')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const activitie = await Activity.findAll({
            attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
            include: Country
        })
        res.status(200).send(activitie)
    } catch (error) {
        console.log(error)
    } 
}); 


router.post('/', async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body;
        const createAct = await Activity.create({           
                name: name[0].toUpperCase() + name.substring(1),
                difficulty: difficulty,
                duration: duration,
                season: season,
        })
        let actADb = await Country.findAll({
                where:{name: countries}
        })
        createAct.addCountry(actADb)
        res.status(200).send('Activity created');

    } catch (error) {
        console.log(error);
    }
});

router.delete('/:name', async (req, res) => {
    try {
        const {name} = req.params;
        const act = await Activity.destroy({
            where:{
                name: name
            }
        })
        res.send('Eliminated')
    } catch (error) {
        console.log(error)
    }
})



module.exports = router