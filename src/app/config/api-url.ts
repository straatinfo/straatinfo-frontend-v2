import { isDevMode } from '@angular/core';

export const BACKEND_URL: string = (isDevMode()) ? 'http://127.0.0.1:5000' : ''; // place backend url here