function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_APP = '/main';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_APP = {
  root: ROOTS_APP,
  general: {
    app: path(ROOTS_APP, '/app'),
    connections: path(ROOTS_APP, '/connections'),
    contacts: path(ROOTS_APP, '/:connectionId/contacts'),
    messages: path(ROOTS_APP, '/messages'),
  },
};
