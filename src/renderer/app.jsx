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
import VSCodeLayout from './mainLayout.jsx';

const App = () => {
    //const [mainMenu, setMainMenu] = React.useState(false); 

    /*React.useEffect(() => {
        const fetchMainMenuStatus = async () => {
            try{
                const result = await window.navigationn.getMainMenu(); 
                setMainMenu(result === 'true');
            }
            catch (error) {
                console.error(error); 
            }
        };
        fetchMainMenuStatus();
    }, []);*/ 
    
    //send message to main process
    const handleButtonClick = () => {
        // send a message to the main process
        window.navigationn.sendMessage('hello from the renderer process'); 
    };

    //set up listener for messages from the main process
    React.useEffect(() => {
        window.navigationn.onMessageReceived((event, message) => {
            console.log('Message received from main:', message); 
        });
    }, []);
    
    
    /*if (!mainMenu) {
        return <p>loading...</p>; 
    }*/
    /*return (
        <div>
            {mainMenu ? (
                <div>
                    <MyApp />
                    <button onClick={handleButtonClick}>Send Message to Main</button>
                </div>
                ) : (
                 <p>
                    something went wrong
                </p>
            )}
        </div>
    );*/
    return (
        <div>
            <VSCodeLayout /> 
        </div>
        
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
//const id = document.getElementById('root'); 
//const root = createRoot(id); 
//root.render(<h2>Hello from React!</h2>); 

