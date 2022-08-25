const express = require('express')
const fs = require('fs')

const Response = require('../helper/Response');

const router = express.Router();

router.get('/sets/list', async (req, res) => {
    try{
        res.json(Response.buildResponse(JSON.parse(fs.readFileSync("./server/data/setcodes.json"))))
    }
    catch(e){
        res.json(Response.buildErrorResponse(e))
    }
})

router.get('/set/*', async (req, res) => {
    try{
        let set = req.url.split("/").pop().toUpperCase()
        res.json(Response.buildResponse(JSON.parse(fs.readFileSync(`./server/data/sets/${set}.json`))))
    }
    catch(e){
        res.json(Response.buildErrorResponse(e))
    }
})

router.get('/pokemon/*/*', async (req, res) => {
    try{
        let setname = req.url.split("/")[2].toUpperCase()
        let id = req.url.split("/")[3]
        let set = JSON.parse(fs.readFileSync(`./server/data/sets/${setname}.json`))
        if(set.cards.length - 1 >= id){
            res.json(Response.buildResponse(set.cards[parseInt(id)]))
        }else{
            throw `Set "${setname}" only contains ${set.cards.length-1} cards`
        }
    }
    catch(e){
        res.json(Response.buildErrorResponse(e))
    }
})

router.post('/pokemon/getList', async (req, res) => {
    try{
        let sets = {}
        let cardList = req.body.cardList.map(card => {
            let cardSet = card.split("-")[0].toUpperCase()
            let cardNumber = card.split("-")[1]
            
            if(!sets[cardSet]){
                sets[cardSet] = JSON.parse(fs.readFileSync(`./server/data/sets/${cardSet}.json`))
            }

            if(sets[cardSet].cards.length - 1 >= cardNumber){
                return sets[cardSet].cards[parseInt(cardNumber)]
            }else{
                return {name: `Cant resolve ${card}. Set ${cardSet} only contains ${sets[cardSet].cards.length-1} cards`}
            }
        })

        if(req.body.filterAttributes){
            cardList = cardList.map(card => {
                return Object.fromEntries(Object.entries(card).filter(keyval => req.body.filterAttributes.includes(keyval[0])))
            })
        }

        res.json(Response.buildResponse(cardList))
    }
    catch(e){
        res.json(Response.buildErrorResponse(e))
    }
})

module.exports = router;