import { JSONPath } from 'jsonpath-plus';
import { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';

const samplePattern =
    '$..[?(@["@Domain"]=="VW.NEW" && (@.Vehicle.Key.match(/^(E11|E21)/)))]';
const sampleInput = `{
  "Request": {
    "test": 15,
    "@Domain": "VW.NEW",
    "@Name": "Products",
    "Vehicle": {
      "ID": "E11XPD",
      "Key": "E11XPD",
      "Year": "2022",
      "PriceTotal": "122",
      "PriceModel": "122",
      "PriceDetails": {
        "VatMode": "Gross"
      },
      "SalesgroupKey": "111",
      "CarlineKey": "111",
      "Version": "222"
    }
  }
}`;

function App() {
    const [inputJson, setInputJson] = useState(sampleInput);
    const [pattern, setPattern] = useState(samplePattern);
    const [pathResult, setPathResult] = useState('');

    useEffect(() => {
        let resultJson;
        try {
            resultJson = JSON.parse(inputJson);
        } catch (e) {
            setPathResult('Invalid JSON input');
            return;
        }

        try {
            setPathResult(JSONPath(pattern, resultJson));
        } catch (err) {
            setPathResult(
                'Invalid JSONPATH pattern or can not execute on current structure'
            );
        }
    }, [pattern, inputJson]);

    const reinit = () => {
        setInputJson(sampleInput);
        setPattern(samplePattern);
    };
    return (
        <div style={{ padding: '2px' }}>
            <div>
                <button onClick={reinit}>Reset</button>
            </div>
            <input
                style={{ width: '99vw' }}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
            />
            <br />
            <div style={{ display: 'flex' }}>
                <div style={{ width: '620px' }}>
                    <textarea
                        onChange={(e) => setInputJson(e.target.value)}
                        style={{ maxWidth: '610px' }}
                        value={inputJson}
                        name="w3review"
                        rows="50"
                        cols="80"
                    />
                </div>
                <div
                    style={{
                        minWidth: '300px',
                        height: '800px',
                        overflowY: 'auto',
                    }}
                >
                    <JSONPretty data={pathResult}></JSONPretty>
                </div>
            </div>
        </div>
    );
}

export default App;
