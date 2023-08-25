const { Activity, Country } = require('../db.js')
const { Op } = require('sequelize');

const byActivities = async () => {
    try {
        let byActivities = await Activity.findAll({
        });
        return byActivities
    } catch (error) {
        console.log('Error en get activities en la funcion ' + error)
    }
};

/*
const postActivity = async (name, difficulty, duration, season, countries) => {
    try {
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });

        console.log({countries});
        let selectCountries = await Country.findAll({
            where: {
                name: countries
            }
        })

        console.log({selectCountries});
        return newActivity.addCountry(selectCountries)
    
    } catch (error) {
        console.log('Error postActivity en controller ' + error)
    }
};
*/


const postActivity = async (name, difficulty, duration, season, countries) => {

    if (!name || !difficulty || !duration || !season || !countries) 
        return console.log({msg: 'Required data is missing'})
    try {
        const [instance, created] = await Activity.findOrCreate({
            where: {
                name: name,
            },
            defaults: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
            }
        });
        if(created) {
            let relatedCountries = await Country.findAll({
                where: {
                name: {
                    [Op.in]: countries
                }
                }}
            )
            console.log({relatedCountries})          
            relatedCountries?.forEach(c => c.addActivity(instance));
            return console.log({msg: 'Activity created successfully'})
        } else {
            return console.log({msg: "There is an activity by that name already"});
        }
    } catch (error) {
    console.log(error)
    }
}


module.exports = {
    byActivities, postActivity
};