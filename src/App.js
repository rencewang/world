import './App.css';
import Map from './components/map';
import Header from './components/header';

function App() {
  return (
    <main className="overall">
      {/* take in a header component */}
      <header className="header">
        <h1>My React App</h1>
      </header>

      {/* this is the rendering space to hold popups */}
      <section></section>

      {/* take in the map component */}
      <Map />

      {/* take in a footer component */}
      <footer></footer>
    </main>
  );
}

export default App;
