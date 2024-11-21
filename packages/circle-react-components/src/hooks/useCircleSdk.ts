import { useContext } from 'react';
import { CircleSdkContext } from './CircleSdkContext';

export function useCircleSdk() {
  return useContext(CircleSdkContext);
}
