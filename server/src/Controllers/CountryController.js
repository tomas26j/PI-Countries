const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");

const getCountries = async () => {
  //Buscar datos de la base en primera instancia
  let dbCountries = await Country.findAll({
    include: [Activity],
  });

  try {
    if (dbCountries.length === 0) {
      console.warn("No hay datos cargados en la base de datos, solicitando a la API");

      const { data } = await axios.get("https://restcountries.com/v3/all");

      // Mapeo de los paises de la API
      const countries = data.map((country) => {
        return {
          id: country.cca3,
          name: country.name.common,
          flags: country.flags[1],
          continents: country.continents[0],
          capital: country.capital
            ? country.capital[0]
            : "Undefined capital city",
          subregion: country.subregion
            ? country.subregion
            : "Undefinded Subregion",
          area: country.area,
          population: country.population,
        };
      });

      // Crear las entradas en la BDD
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
          },
        });
      });

      // Volver a solicitar una vez cargados los datos
      dbCountries = await Country.findAll({
        include: [Activity],
      });

    } else console.log("La base de datos esta cargada, retornando datos desde ahi...");
    
    // Retornar los datos de la base
    return dbCountries;
  
  }catch (err){console.log("No se pudo solicitar datos de los paises: " + err)}
};

const getCountriesByName = async (query) => {
  try {
      
    console.log(`Buscando pais: ${query}`);
    const countries = await Country.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            id: {
              [Op.eq]: query,
            },
          },
        ],
      },
      include: [Activity],
    });
    console.log({ countries });
    
    return countries;
  } catch (err) {console.log("No se pudo encontrar ningun pais con ese nombre: " + err);}
};


module.exports = {
  getCountries,
  getCountriesByName,
};
