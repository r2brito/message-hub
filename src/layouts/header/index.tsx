import { AppBar, Box } from '@mui/material';

import AccountPopover from './accountPopover';

export default function Header() {
  return (
    <AppBar
      position="static"
      className="h-20 shadow-none bg-white px-4 flex items-center justify-between"
    >
      <Box className="ml-auto flex items-center">
        <AccountPopover />
      </Box>
    </AppBar>
  );
}
