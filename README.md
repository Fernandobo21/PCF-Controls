# CosmosDB PCF
## Description
This control has been created to retrieve data from any cosmodb environment and show the returned JSON. This will make a request to the selected CosmosDB environment (based on a query), parse the Json retured and paste it in a JsonPrettifier React Control. This control will be helpful if you do not have a sync data between D365 and CosmosDB, but you need to show registries from cosmos db related with D3365.
## Download
## How to configurate it
1. Add the control to the desided field to show the data.
2. The parameters of the control are explained below.
## Input Parameters
- Field --> It's the D365 form field were we will put the control. (Required)
- Master Key --> Here goes your Key of your CosmosDB, you will only need a key for read only. (Required)
- End Point --> Here goes the Url of your CosmosDB. (Required)
- Data Base --> Here goes the literal Data Base of your CosmosDB. (Required)
- Container --> Here goes the literal container name of your CosmosDB data base. (Required).
- Partition Type --> Here goes the partition type key of your CosmosDB. (Required).
- Query --> Here goes the Query to fetch the data. (Required)
