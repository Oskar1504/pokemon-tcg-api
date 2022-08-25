# Pokemon tcg Api

this is a small tool which lets you host your own Pokemon tcg api.

It scraps data from https://limitlesstcg.com and parse it into .json files.

Ones the Data scraped the expressJS api delivers the .json files.

- You can specify after how much seconds/houers the data files gets invalidated and needs to be scraped again. 
    - This is only usefull if u need the prices for the cards.
- you can specify the language in ``.env``
    - available are:  de | en | fr | it | es | pt


### Live demo

https://oskar1504.ngrok.io/pokemon-tcg-api/set/pgo
> returns PGO cardlist

https://oskar1504.ngrok.io/pokemon-tcg-api/pokemon/pgo/2
> returns PGO-2 (the second pokemon)

## Howto
- specify sets to be scraped in ``/server/data/setcodes.json``
- run `npm run scrap`
    - this will scrap an copy all the data from limitlesstcg.com
    - you can also reduce the delay between each request to speed up the process
        - be carefull you can mybe get softbanned from the website when delay to short
- specify/edit ``.env`` file to your needs
    - if ``.env`` not exist copy ``.env-template`` and rename
- after the script finished run `npm run start`


##  Routes

| route  | method  |  returns | example |
|---|---|---|---|
| get | /set/list  |  ./server/data/setcodes.json | /set/list |
| get | /set/*1  |  ./server/data/sets/*1.json | /set/pgo |
| get | /pokemon/*1/*2  |  ./server/data/sets/*1.json card number *2 | /pokemon/pgo/2 |
| post json | /pokemon/getList  |  array of card objects | /pokemon/getList |
| post json | /pokemon/getList/sortPrice  |  sorted array of card objects | /pokemon/getList/sortPrice |


## post example
``/pokemon/getList``
request body type json
```json
{
	"cardList":[            // required
		"pgo-2",
		"PGO-8228",
		"Cre-21"
	],
	"filterAttributes": [   // optional
		"set",
		"number",
		"name",
		"price"
	]
}
```
``/pokemon/getList/sortPrice``
request body type json
```json
{
	"cardList":[        // required
		"pgo-2",
		"PGO-8228",
		"Cre-21"
	]
}
```

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
        ...
    ]
}
```