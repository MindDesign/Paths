/*
 *
 * Paths Sidebar Component
 *
 */

import React from 'react';
import pluginId from '../../pluginId';
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
} from '@strapi/design-system';
import Cog from '@strapi/icons/Cog';

export default function Sidebar() {
  const links = [{
    id: 1,
    label: 'Categories',
    icon: <Cog />,
    to: `/plugins/${pluginId}/categories?page=1&pageSize=10`
  }, {
    id: 2,
    label: 'Paths',
    icon: <Cog />,
    to: `/plugins/${pluginId}/paths?page=1&pageSize=10`
  }];

  return <>
    <SubNav ariaLabel="Paths sub nav">
      <SubNavHeader label="Paths" />
      <SubNavSections>
        <SubNavSection label="Administration">
          {links.map(link => <SubNavLink to={link.to} active={link.active} key={link.id} icon={link.icon}>
            {link.label}
          </SubNavLink>)}
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  </>
};
