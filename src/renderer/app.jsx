import * as React from 'react';
import { createRoot } from 'react-dom/client';

/*const App = () => {
    const [versions, setVersions] = React.useState({
        node: '',
        chrome: '',
        electron: '',
        pingResponse: ''
    }); 

    React.useEffect(() => {
        const fetchVersions = async () => {
          const chrome = window.versions.chrome();
          const node = window.versions.node();
          const electron = window.versions.electron();
          const pingResponse = await window.versions.ping();
          console.log(pingResponse); 
          setVersions({ chrome, node, electron, pingResponse });
        };
    
        fetchVersions();
      }, []);

    return (
    <div>
        <h2>Hello from React!</h2>
        <p>This app is using Chrome (v{versions.chrome}), Node (v{versions.node}), and Electron (v{versions.electron})</p>
    </div>
    );
};*/
import MyApp from './tutorial.jsx';
const App = () => {
    return (
        <div>
            <MyApp />
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
//const id = document.getElementById('root'); 
//const root = createRoot(id); 
//root.render(<h2>Hello from React!</h2>); 

