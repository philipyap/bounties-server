// create router
const router = require('express').Router()

//import models
const db = require('../models')


//GET /bounties
router.get('/', (req, res)=> {
    //res.send('You have reached the Get /bounties route')
    db.Bounty.find()
    .then(foundBounties=>{
        console.log(foundBounties)
        res.send(foundBounties)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'DataBase asleep?'})
    })
})

router.get('/:id', (req, res)=>{
    //res.send('Your have reached the GET /bounties/:id')
    db.Bounty.findById(req.params.id)
    .then(foundBounty=>{
        if(foundBounty){
            res.send(foundBounty)
        }else {
            res.status(404).send({message: 'Resource not located'})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message:'Service Unavailable'})
    })
})

router.post('/', (req, res)=>{
    db.Bounty.create(req.body)
    .then(createdBounty=>{
        res.status(201).send(createdBounty)
    })
    .catch(err=>{
        console.log('Error while creating new bounty', err)
        if(err.name === 'Validation Error'){
            res.status(406).send({message: 'Validation Error'})
        }else {
            res.status(503).send({message: "Database or server error"})
        }
    })
})

router.put('/:id', (req, res)=>{
    db.Bounty.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedBounty => {
        res.send(updatedBounty)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })

})


router.delete('/:id', (req, res)=>{
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

// export these routes so they can used in index.js
module.exports = router 