const fs = require('fs');
const path = require('path');
const { Country, Activity } = require('../db.js');

const filePath = path.join(__dirname, '../api/db.json');

  const getApiInfo = async () => {
    try {
      fs.readFile(filePath, 'utf-8', async (err, data) => {
        if (err) {
          console.error('Error al leer el archivo JSON:', err);
          return;
        }
      
        try {
          const countries = JSON.parse(data);
      
          // Itera a través de los objetos del JSON y guardar en la base de datos
          for (const country of countries) {
            await Country.findOrCreate({
              id: country.id,
              name: country.name,
              flags: country.flags,
              continents: country.continents,
              capital: country.capital,
              subregion: country.subregion,
              area: country.area,
              population: country.population
            });
          }
      
          console.log('Datos guardados en la base de datos.');
        } catch (parseError) {
          console.error('Error al analizar el archivo JSON:', parseError);
        }
      });
    } catch (error) {
      console.error(error.message)
    }
  }

  const getDbInfo = async () => {
    await getApiInfo()
    const aux = await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: [],
            }
        }
    })
    return aux
}

const getActivities = async () => {
    const get = await Activity.findAll()
    return get;
}

module.exports = { getDbInfo, getActivities };