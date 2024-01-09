import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import { browser } from "wxt/browser"
import './App.css';
import ApaGenerator from '@/components/ApaGenerator';

function App() {

  return (
    <>
      <div>
        <img src={wxtLogo} className="logo" alt="WXT logo" />
      </div>
      <h1>WXT + React</h1>
      <ApaGenerator />
    </>
  );
}

export default App;
