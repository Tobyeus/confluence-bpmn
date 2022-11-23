import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import ReactBpmn from 'react-bpmn';

let xmlContent;
let showDiagram = true;
let updateXML;

function App() {
  const [data, setData] = useState(null);
  const [xmlContent, setXML] = useState(false);
  // const [showDiagram, setShowDiagram] = useState(false);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    updateXML = setXML;
    return () => updateXML = null;
  }, []);

  return (
    <div>
      {data ? data : 'Loading...'}
      <h2>Hello World</h2>
        <ReactBpmn
          diagramXML={xmlContent}
        />
      <input type="file" onChange={(e) => readFile(e.target)} />
    </div>
  );
}

async function readFile(input) {
  try {
    let file = input.files[0];
    let xml = await processXML(file);
    console.log(xml);
    updateXML(xml);
  } catch(err){
    console.log(err);
  }
}

function processXML(file) {
  return new Promise((resolve,reject) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    }

    reader.readAsText(file);
  })
}


export default App;
