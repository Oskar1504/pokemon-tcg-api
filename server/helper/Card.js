
module.exports = class Card{
    constructor(dataTableRow){
        this.parseDataTableRow(dataTableRow)
    }


    parseDataTableRow(dataTableRow) {
        let attributes = [...dataTableRow.querySelectorAll("td")]
        //TODO make this if nice
        if(attributes.length >= 7){
            this.set = attributes[0].textContent
            this.number = attributes[1].textContent
            this.name = attributes[2].textContent
            this.type = attributes[3].innerText.replace(/ /g, "").replace(/\n/g,"")
            this.rarity = attributes[4].textContent.replace(/ /g, "").replace(/\n/g,"")
            this.price = {}
            this.price.usd = attributes[5].textContent.replace(/ /g, "").replace(/\n/g,"")
            this.price.eur = attributes[6].textContent.replace(/ /g, "").replace(/\n/g,"")
            this.image = dataTableRow.getAttribute("data-hover")
        }
    }
}