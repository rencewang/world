import './App.css';
import Map from './components/map';
import Header from './components/header';

function App() {
  return (
    <main className="overall">
      <Header />

      {/* this is the rendering space to hold popups */}
      <section></section>

      <Map />

      {/* take in a footer component */}
      <footer></footer>
    </main>
  );
}

export default App;
