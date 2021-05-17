import { Route, Redirect } from 'react-router-dom';
import { Suspense } from 'react';
import routes from '../routes';
import ImageLoader from './Loader/Loader';

const App = () => (
  <>
      <Suspense fallback={<ImageLoader />}>
        {routes.map(route => {
          return <Route key={route.label} {...route} />;
        })}
        <Redirect to="/" />
      </Suspense>
  </>
);

export default App;
