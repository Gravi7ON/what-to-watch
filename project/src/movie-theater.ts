import {AuthorizationStatus} from './const';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.NoAuth;

export {isCheckedAuth};
