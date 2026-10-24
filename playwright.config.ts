import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',fullyParallel:false,use:{baseURL:process.env.TEST_URL||'http://127.0.0.1:4173',reducedMotion:'reduce'},webServer:process.env.TEST_URL?undefined:{command:'npm run dev -- --host 127.0.0.1 --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:true},reporter:'list'});
