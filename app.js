require('dotenv').config()
const express = require('express')
const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js
const {getCityInfo, getJobs} = require('./util')

// TODO: Statically serve the public folder
app.use(express.static('public'))


app
    // TODO: declare the GET route /api/city/:city
    .route('/api/city/:city')
    .get(async (req, res) =>{
        try {
            // This endpoint should call getCityInfo and getJobs and return
            // the result as JSON.
            const {city} = req.params
            const cityInfo = await getCityInfo(city)
            const jobs = await getJobs (city)


            // If no city info or jobs are found,
            // the endpoint should return a 404 status
            if (!cityInfo && !jobs){
                return res.status(404).json({error:'City info and Job info not found'})
            }
            
            return res.status(200).json({
                cityInfo: cityInfo || false, 
                jobs: jobs || false
            })    

        } catch(err){
            res.status(502).send('API not available')
        }
        
    })

module.exports = app
