import React from 'react';

import { Avatar } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export default function AccountPopover() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={handleClick} className="mt-2 ml-2 p-0 focus:outline-none">
        <Avatar alt={user?.displayName} src={user?.photoURL} />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{
          paper: 'rounded-lg shadow-lg',
        }}
      >
        <div className="px-6 py-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{user?.displayName}</h3>
        </div>

        <div className="border-t border-dashed" />

        <button
          onClick={handleLogout}
          className="w-full text-red-600 font-medium py-2 hover:bg-red-50 transition text-center"
        >
          Logout
        </button>
      </Popover>
    </>
  );
}
