import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import { browser } from "wxt/browser"
import ReactDom from "react-dom/client"
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  async function onClick() {
    console.log("Clicking button");
    var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
    try {
      if (tab) {
        await browser.tabs.sendMessage(tab.id || 0, { command: "apa" });
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button id='myButton' onClick={onClick}>Click </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
