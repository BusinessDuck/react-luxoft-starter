/* global __dirname */

import path from 'path';

const ROOT = path.resolve(__dirname, '../../');

export const resolvePath = relativePath => (
  path.resolve(ROOT, relativePath)
);

export const SRC = resolvePath('src');
export const DIST = resolvePath('dist');
export const NODE_MODULES = resolvePath('node_modules');
