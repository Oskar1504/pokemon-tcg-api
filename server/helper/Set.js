const fs = require("fs")
const Card = require("./Card")

const dataPath = "./server/data/sets/"

module.exports = class Set{
    constructor(name, dataTable){
        this.name = name
        this.cards = this.parseDataTable(dataTable)
        this.saveToFile()
    }


    parseDataTable(dataTable) {
        let o = []

        if(dataTable != null){
            let cardRows = [...dataTable.querySelectorAll("tr")]
            cardRows.forEach(cardRow => {
                o.push(new Card(cardRow))
            })
        }else{
            o = this.loadFromCache()
        }

        return o
    }

    saveToFile(){
        fs.writeFileSync(`${dataPath}${this.name}.json`, JSON.stringify(this, null, 4))
    }

    loadFromCache(){
        let inData = JSON.parse(fs.readFileSync(`${dataPath}${this.name}.json`))
        return inData.cards
    }
}