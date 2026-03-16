#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsPath = path.resolve(__dirname, '../posts.js');
const code = fs.readFileSync(postsPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const posts = Array.isArray(sandbox.window.BLOG_POSTS) ? sandbox.window.BLOG_POSTS : [];
process.stdout.write(JSON.stringify(posts, null, 2));
