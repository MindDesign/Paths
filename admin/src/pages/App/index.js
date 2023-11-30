/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import CategoriesPage from '../CategoriesPage';
import EditCategoryPage from '../EditCategoryPage';
import PathsPage from '../PathsPage';
import EditPathPage from '../EditPathPage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route path={`/plugins/${pluginId}/categories`} component={CategoriesPage} exact />
        <Route path={`/plugins/${pluginId}/categories/:id`} component={EditCategoryPage} exact />
        <Route path={`/plugins/${pluginId}/paths`} component={PathsPage} exact />
        <Route path={`/plugins/${pluginId}/paths/:id`} component={EditPathPage} exact />
        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
};

export default App;
