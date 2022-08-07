import {createAction} from '@reduxjs/toolkit';

const redirectToRoute = createAction<string>('app/redirectToRoute');

export {redirectToRoute};

