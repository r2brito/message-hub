import { matchPath } from 'react-router-dom';

export { default as NavSection } from './section';

export function isExternalLink(path: string | any): boolean {
  return path.includes('http');
}

export function getActive(path: string, pathname: string): boolean {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}
