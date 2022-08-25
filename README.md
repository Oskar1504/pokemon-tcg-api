# Pokemon tcg Api

this is a small tool which lets you host your own Pokemon tcg api.

It scraps data from https://limitlesstcg.com and parse it into .json files.

Ones the Data scraped the expressJS api delivers the .json files.

### WIP
- You can specify after how much seconds/houers the data files gets invalidated and needs to be scraped again. This is only usefull if u need the prices for the cards.
- you can specify the language in ``.env``

## Howto
- specify sets to be scraped in ``/server/data/setcodes.json``
- run `npm run scrap`
    - this will scrap an copy all the data from limitlesstcg.com
    - you can also reduce the delay between each request to speed up the process
        - be carefull you can mybe get softbanned from the website when delay to short
- specify/edit ``.env`` file to your needs
- after the script finished run `npm run start`


##  Routes

| route  |  returns | example |
|---|---|---|
| /set/list  |  ./server/data/setcodes.json | /set/list |
| /set/*1  |  ./server/data/sets/*1.json | /set/pgo |
| /pokemon/*1/*2  |  ./server/data/sets/*1.json card number *2 | /pokemon/pgo/2 |


## more Config
- to force rescraping delete all files in ``./server/data/html/`` and ``./server/data/html/``


## Future plans
- add cron job which retry scrap every n hours

## Set data structure

```json
{
    "name":"AOR",
    "cards": [
        {
            "set": "AOR",
            "number": "1",
            "name": "Myrapla",
            "type": "GBasic",
            "rarity": "Common",
            "price": {
                "usd": "$0.13",
                "eur": "0.06€"
            },
            "image": "https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/AOR/AOR_001_R_DE_XS.png"
        },
    ]
}
```