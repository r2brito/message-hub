import React, { memo } from 'react';

import { Stack } from '@mui/material';

import { NavListRoot } from './navList';

function NavSection({ navConfig }: any) {
  return (
    <Stack direction="row" justifyContent="center" className="rounded px-1">
      <Stack direction="row">
        {navConfig.map((group: any) => (
          <Stack key={group.subheader} direction="row" flexShrink={0}>
            {group.items.map((list: any) => (
              <NavListRoot key={list.title} list={list} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(NavSection);
