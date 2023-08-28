const { Router } = require('express');
const { getCountries, getCountriesByName } = require('../Controllers/CountryController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', async (req, res) =>{                                                                            
    const {name} = req.query;

    if(!name){                                                                  
        let countries = await getCountries();                                        
        return res.status(200).send(countries);
    }else{
        try{
            console.log("BUSCANDO CON NOMBRE ESPECIFICO...") 
            const country = await getCountriesByName(name);                                     
            const nameCountry = country.filter(c => c.name.toLowerCase().startsWith(name.toLowerCase()));       
            nameCountry.length ?
            res.status(200).send(nameCountry) : res.status(404).send('Country name does not exist!');                                                   
        }
        catch(error){
         res.send(error)
        }; 
    };
    return res.status(400).send("DATA NOT FOUND");
});


router.get('/:id', async  (req, res) =>{                                             
    let {id} = req.params;                                                              
    try{
        console.log("BUSCANDO CON NOMBRE ESPECIFICO...") 
        const country = await getCountriesByName(id);                                     
        const nameCountry = country.filter(c => c.id.startsWith(id));       
        nameCountry.length ?
        res.status(200).send(nameCountry) : res.status(404).send('Country name does not exist!');                                                   
    }
    catch(error){
     res.send(error)
    };
    return res.status(400).send("DATA NOT FOUND");
})

module.exports = router;