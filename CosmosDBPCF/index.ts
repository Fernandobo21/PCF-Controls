import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import CosmosData from "./getCosmosData";
const cosmos = require('@azure/cosmos');
export class CosmosControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	/**
	 * Empty constructor.
	 */
	constructor()
	{ }
	private _container: HTMLDivElement;
	private _value: string;
	private props: any = {
		_condition1: null,
		_condition2: null,
		_condition3: null,
		_query: "",
		_isActive: false,
		_response: "",
	};
	private config = {
		endpoint: "",
		key: "",
		databaseId: "",
		containerId: "",
		partitionKey: { }
	};
	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = container;
		this.config.endpoint = context.parameters.endpoint.raw || "";
		this.config.key = context.parameters.masterKey.raw || "";
		this.config.databaseId = context.parameters.dataBase.raw || "";
		this.config.containerId = context.parameters.container.raw || "";
		this.config.partitionKey = { kind: "Hash", paths: ["/" + context.parameters.partition.raw] }
		
		this.props = {
			_condition1: (context.parameters.condition1.type == "Whole.None") ? context.parameters.condition1.raw || 0 : context.parameters.condition1.raw || "",
			_condition2: (context.parameters.condition2.type == "Whole.None") ? context.parameters.condition2.raw || 0 : context.parameters.condition2.raw || "",
			_condition3: (context.parameters.condition3.type == "Whole.None") ? context.parameters.condition3.raw || 0 : context.parameters.condition3.raw || "",
		}
		this.props._query = context.parameters.query.raw || "";
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public async updateView(context: ComponentFramework.Context<IInputs>): Promise<void>
	{
		var query = this.fillQuery(this.props._query, this.props._condition1, this.props._condition2, this.props._condition3);
		await this.loadData(this.props._fileId, query);
		this.renderElement();
	}
	/**
	 * Method to render the component
	 */
	private renderElement(): void {
		ReactDOM.render(
			React.createElement(
				CosmosData,	this.props
			),
			this._container
		);
	}
	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return { field: this._value };
	}
	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		this.props = null;
		ReactDOM.unmountComponentAtNode(this._container);
	}
	public async loadData(fileId:string, inputQuery:string){
        console.log("Entering loadData");
        const { endpoint, key, databaseId, containerId } = this.config;
        const { CosmosClient } = cosmos;
        const client = new CosmosClient({ endpoint: endpoint, key: key, connectionPolicy: { enableEndpointDiscovery: true }});
        var database = client.database(databaseId);
		var container = database.container(containerId);
		var querySpec = { query: inputQuery };
		var queryAlias = inputQuery.substring((inputQuery.toUpperCase().search("FROM") + 4), inputQuery.toUpperCase().search("WHERE")).trim();
		var attributes = this.mapAttributes(inputQuery, queryAlias, inputQuery.toUpperCase().search("FROM"));
		//TODO: get the fields from the query
        const result = await container.items.query(querySpec).fetchAll();
        console.log("Result: " + result.resources.length);
        if ((result.resources != null) && (result.resources.length !== 0))
        {
			this.props._response = "";
            for (var i = 0; i < result.resources.length; i++)
            {                
				var resource = result.resources[i];
				//no Json in Field
				//TODO: if no json in field, need only to parse the reource value
				this.props._response = [];
				attributes.forEach(att => {
					if (resource[att] !== null && resource[att] !== undefined) this.props._response.push(resource[att]);
				});
                this.props._isActive = true;
            }
        }
	}
	private fillQuery(queryToFill:string, NC1:any, NC2:any, NC3:any)
	{
		var finalQuery = queryToFill;
		if ((NC1 != null) && ((NC1 != 0) || (NC1 != ""))) finalQuery = finalQuery.replace('{0}', NC1.toString());
		if ((NC2 != null) && ((NC2 != 0) || (NC2 != ""))) finalQuery = finalQuery.replace('{1}', NC2.toString());
		if ((NC3 != null) && ((NC3 != 0) || (NC3 != ""))) finalQuery = finalQuery.replace('{2}', NC3.toString());
		return finalQuery;
	}
	private mapAttributes(query:string, alias:string, limit:number)
	{
		var attributes = [];
		var ia = 0;
		var finished = false
		do {
			var att = query.substring(query.search(alias) + (alias.length + 1), (query.search(",") == -1) ? query.toUpperCase().search("FROM") : query.search(",")).trim();
			if ((att != null) && (att != ""))
			{
				attributes[ia] = att;
				ia++;
				query = query.substr(query.search(att) + (att.length + 1));
				if (query.toUpperCase().search("FROM") == 0)
					finished = true;
				
			}
			else finished = true;
		}  
		while (finished != true);
		return attributes;
	}
}