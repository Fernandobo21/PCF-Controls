# CosmosDB PCF
## Description
This control has been created to retrieve data from any cosmodb environment and show the returned JSON. This will make a request to the selected CosmosDB environment (based on a query), parse the Json retured and paste it in a JsonPrettifier React Control. This control will be helpful if you do not have a sync data between D365 and CosmosDB, but you need to show registries from cosmos db related with D3365.
## Download
## How to configurate it
1. Add the control to the desided field to show the data.
2. The parameters of the control are explained below.
## PreRequisites
1. Had a Cosmos DB environment (pretty obvious).
2. Add your D365 environment where you will use this control to the CORS policies of the Cosmos DB resource. (See the explanation below)
## Input Parameters
- Field --> It's the D365 form field were we will put the control. (Required)
- Master Key --> Here goes your Key of your CosmosDB, with the read-only key will work. (Required)
- End Point --> Here goes the Url of your CosmosDB. (Required)
- Data Base --> Here goes the literal Data Base of your CosmosDB. (Required)
- Container --> Here goes the literal container name of your CosmosDB data base. (Required).
- Partition Type --> Here goes the partition type key of your CosmosDB. (Required).
- Query --> Here goes the Query to fetch the data. (Required)
## Query Format
The format of the query must have a "TOP 1" on the select and it has to be a simple query, not a complex one. To make sure that the query works test it before on the query tab of your cosmos db environment. For the conditions, at the moment, it will only accept up to three conditions. Planing to make it up to 10.
### Query Example
SELECT TOP 1 c.fieldA, c.fieldB, c.fieldC, c.fieldD FROM c WHERE c.fieldA='{0}' and c.fieldB='{1}' ORDER BY c._ts DESC
## Adding CORS
To add your D365 environment to the CORS:
![alt text](https://github.com/Fernandobo21/PCFControls/blob/master/assets/Update-CORS.png "Add D365 to CORS")
## Adding the control
Once you fill all the fields, you'll find a problem at the "Query" field.
There's a known bug for the single text fields that does not let you put more than 100 characters.
### Workaround 1 (Easiest for developers)
If you open your developer tools (normally F12 key), select the field and change the "maxlength" property.
![alt text](https://github.com/Fernandobo21/PCFControls/blob/master/assets/Max-Length-Change.png "Selecting the TextArea")
![alt text](https://github.com/Fernandobo21/PCFControls/blob/master/assets/maxlength-property.png "maxlength property")
### Workaround 2
You can always create a field (TextArea) in the entity, with a maximun length of 4000, put here your query and then bind the field to the parameter.
## Example
I've already created an item in the container of my Cosmos DB like this:
![alt text](https://github.com/Fernandobo21/PCFControls/blob/master/assets/Cosmos-DB-Data(Azure-Data-Explorer).png "Cosmos DB Data in Azure")
I will use the this query for the example:
SELECT TOP 1 c.fieldA, c.fieldB FROM c WHERE c.fieldA='{0}' and c.fieldB='{1}' ORDER BY c._ts DESC
{0}: the value of the condition 1 wich is 'valueA'.
{1}: the value of the condition 2 wich is 'valueB'.
![alt text](https://github.com/Fernandobo21/PCFControls/blob/master/assets/Conditions.png "Condition 1 and Condition 2")
And as the image showns you can see the exacta data in the control.
![alt text](https://github.com/Fernandobo21/PCFControls/blob/master/assets/Cosmos-DB-Data(D365).png "Cosmos DB Data in Azure")