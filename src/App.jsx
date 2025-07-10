import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const User = lazy(() => import('./pages/UserPage/UserPage'));
const AddPecipe = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));
const Recipe = lazy(() => import('./pages/RecipePage/RecipePage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const UserFollowers = lazy(() =>
  import('./components/UserFollowers/UserFollowers')
);
const UserFavorites = lazy(() =>
  import('./components/UserFavorites/UserFavorites')
);
const UserFollowing = lazy(() =>
  import('./components/UserFollowing/UserFollowing')
);

function App() {
  return (
    <SharedLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<User />}>
            <Route path="favorites" element={<UserFavorites />} />
            <Route path="followers" element={<UserFollowers />} />
            <Route path="following" element={<UserFollowing />} />
          </Route>
          <Route path="/recipe/add" element={<AddPecipe />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}

export default App;
