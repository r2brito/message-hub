import { forwardRef, ReactNode } from 'react';

import { Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { isExternalLink } from '..';

import { ListItemStyle } from './style';

interface NavItemProps {
  item: {
    title: string;
    path?: string;
    icon?: ReactNode;
    children?: NavItemProps['item'][];
  };
  active?: boolean;
  open?: boolean;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

export const NavItemRoot = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref: any) => {
    const { title, path, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          // @ts-ignore
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent title={title} />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      // @ts-ignore
      <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
        <NavItemContent title={title} />
      </ListItemStyle>
    ) : (
      // @ts-ignore
      <ListItemStyle component={RouterLink} to={path!} activeRoot={active}>
        <NavItemContent title={title} />
      </ListItemStyle>
    );
  }
);

export const NavItemSub = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, children } = item;

    if (children) {
      return (
        <ListItemStyle
          // @ts-ignore
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent title={title} />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle
        // @ts-ignore
        subItem
        href={path}
        disableRipple
        rel="noopener"
        target="_blank"
        component={Link}
      >
        <NavItemContent title={title} />
      </ListItemStyle>
    ) : (
      // @ts-ignore
      <ListItemStyle disableRipple component={RouterLink} to={path!} activeSub={active} subItem>
        <NavItemContent title={title} />
      </ListItemStyle>
    );
  }
);

function NavItemContent({ title }: { title: string }) {
  return <>{title}</>;
}
