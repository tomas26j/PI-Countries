const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db.js')

const getCountries = async () => {
    let dbCountries = await Country.findAll({
        include: [Activity]
    })
    try {
        if(dbCountries.length === 0) {
            console.warn("NO HABIA DATOS EN LA DB, BUSCANDO EN LA API")
            const { data } = await axios.get('https://restcountries.com/v3/all');
            
            const countries = data.map((country) => {
                return {
                    id: country.cca3,
                    name: country.name.common,
                    flags: country.flags[1],
                    continents: country.continents[0],
                    capital: country.capital ? country.capital[0] : 'Undefined capital city',
                    subregion: country.subregion ? country.subregion : 'Undefinded Subregion',
                    area: country.area,
                    population: country.population
                };
            })
        
            countries.forEach((country) => {
                Country.findOrCreate({
                    where: { id: country.id },
                    defaults: {
                        id: country.id,
                        name: country.name,
                        flags: country.flags,
                        continents: country.continents,
                        capital: country.capital,
                        subregion: country.subregion,
                        area: country.area,
                        population: country.population,
                    }
                })
            });
            dbCountries = await Country.findAll({
                include: [Activity]
            })
        }else(console.log("Ya hay datos en la DB, devolviendo eso"))
        return dbCountries
    } catch(error){
        console.log('Error getCountries en controller ' + error)
    }
}

const getCountriesByName = async (query) => {
    try {
        console.log("GetCountriesByName EJECUTADO");
        const countries = await Country.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${query}%`
                        }
                    },
                    {
                        id: {
                            [Op.eq]: query  
                        }
                    }
                ]
            },
            include: [Activity]
        });

        console.log({countries});
        return countries
    } catch (error) {
        console.log('error getCountriesByName en controller ' + error)
    }
}

module.exports = {
    getCountries,
    getCountriesByName
};