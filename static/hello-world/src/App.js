import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import ReactBpmn from 'react-bpmn';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <div>
      {data ? data : 'Loading...'}
      <h2>Hello World</h2>
      <ReactBpmn
        url='./test.bpmn'
        />
    </div>
  );
}

export default App;
