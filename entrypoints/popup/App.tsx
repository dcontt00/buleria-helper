import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import { browser } from "wxt/browser"
import './App.css';

function App() {

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
        <img src={wxtLogo} className="logo" alt="WXT logo" />
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button id='myButton' onClick={onClick}>Generar APA </button>
      </div>
    </>
  );
}

export default App;
