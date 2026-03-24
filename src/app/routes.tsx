import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { TreeList } from './pages/TreeList';
import { TreeDetail } from './pages/TreeDetail';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { AddTree } from './pages/AddTree';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: TreeList },
      { path: 'tree/:id', Component: TreeDetail },
      { path: 'leaderboard', Component: Leaderboard },
      { path: 'profile', Component: Profile },
      { path: 'add', Component: AddTree },
    ],
  },
]);
