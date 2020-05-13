import * as React from 'react';
const JSONPrettier = require('react-json-pretty');
class Cosmosdata extends React.Component<any> {
    constructor(props: any){
        super(props);
    }    
    public render(): JSX.Element {
        console.log("Entering render");
        return (
            <div style={{ flex: 1, display:'flex',  flexDirection: 'row', textAlign: 'left' }}>
                <div style={{ flexDirection: 'row' }}>
                    {this.props._isActive ? <label>Request</label> : null }
                    {this.props._isActive ? <JSONPrettier data={this.props._request}></JSONPrettier> : null }
                </div>
                <div style={{ flexDirection: 'row' }}>
                    {this.props._isActive ? <label>Response</label> : null }
                    {this.props._isActive ? <JSONPrettier data={this.props._response}></JSONPrettier> : null }
                </div>
            </div>
        );
    }
}
export default Cosmosdata;