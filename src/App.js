import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import routes from './routes';
import Loader from 'react-loader-spinner';
import './App.css';

const HomePage = lazy(() => import('./views/HomePage.js'));
const MoviesPageView = lazy(() => import('./views/MoviesPage'));
const DetailsView = lazy(() => import('./views/Details'));

function App() {
  return (
    <>
      <div className="App">
        <AppBar />
      </div>
      <main>
        <Suspense
          fallback={
            <Loader
              type="Rings"
              color="#fa830f"
              height={80}
              width={80}
              className="loader"
            />
          }
        >
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route exact path={routes.movies} component={MoviesPageView} />
            <Route path={routes.movieDetails} component={DetailsView} />
            <Route component={HomePage} />
          </Switch>
        </Suspense>
      </main>
    </>
  );
}

export default App;
