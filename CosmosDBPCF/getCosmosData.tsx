import * as React from 'react';
const JSONPrettier = require('react-json-pretty');
const theme = {
    main: 'line-height:1.5em;color:#edede8;background:#282828;overflow:auto;font-family:SegoeUI;font-size:1rem;',
    error: 'line-height:1.5em;color:#66d9ef;background:#282828;overflow:auto;font-family:SegoeUI;font-size:1rem;',
    key: 'color:#9fd72e;',
    string: 'color:#dacf6f;',
    value: 'color:#edede8;',
    boolean: 'color:#ad81ff;',
  };
class Cosmosdata extends React.Component<any> {
    constructor(props: any){
        super(props);
    }    
    public render(): JSX.Element {
        console.log("Entering render");
        return (
            <div style={{ flex: 1, display:'flex',  flexDirection: 'row', textAlign: 'left' }}>
                <div style={{ flexDirection: 'row' }}><JSONPrettier data={this.props._response} theme={theme} ></JSONPrettier></div>
            </div>
        );
    }
}
export default Cosmosdata;