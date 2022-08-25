require("dotenv").config()
const axios = require("axios")
const HTMLParser = require("node-html-parser")
const fs = require("fs")

const Set = require("./helper/Set")

let scrapSets = require("./data/setcodes.json")
scrapSets = shuffle(scrapSets)


const dataPath = "./server/data/sets/"
const dataHtmlPath = "./server/data/html/"

let Sets = []

async function loadSets(){

    for(let scrapSet of scrapSets){

        if(!fs.existsSync(`${dataPath}${scrapSet}.json`)){

            let htmlstring = ""
            if(!fs.existsSync(`${dataHtmlPath}${scrapSet}.html`)){

                let scrapDelay = randomIntFromInterval(process.env.SCRAP_MIN_DELAY, process.env.SCRAP_MAX_DELAY)
                console.log("Waitng for " + scrapDelay + " seconds")
                await new Promise(resolve => setTimeout(resolve, (scrapDelay * 1000)));

                htmlstring = await axios({
                    method: "get",
                    url:`https://limitlesstcg.com/cards/de/${scrapSet}?display=list`
                })
                .then(response => {
                    fs.writeFileSync(`./server/data/html/${scrapSet}.html`, response.data)
                    console.log(`Copied html for set "${scrapSet}"`)
                    return response.data
                })
            }else{
                htmlstring = fs.readFileSync(`${dataHtmlPath}${scrapSet}.html`).toString()
                console.log(`Used html for set "${scrapSet}" from cache`)
            }

            
            let root = HTMLParser.parse(htmlstring);

            Sets.push(new Set(scrapSet, root.querySelector("main table.data-table")))

        }else{
            Sets.push(new Set(scrapSet, null))
            console.log("Load setData from cache")
        }

    }
}

loadSets()

Sets.forEach(set => {
    console.log(`${set.name} contains ${set.cards.length} cards`)
})



/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
 function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//https://stackoverflow.com/a/7228322
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}