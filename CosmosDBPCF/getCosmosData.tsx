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
                <div style={{ flexDirection: 'row' }}><JSONPrettier data={this.props._response}></JSONPrettier></div>
            </div>
        );
    }
}
export default Cosmosdata;