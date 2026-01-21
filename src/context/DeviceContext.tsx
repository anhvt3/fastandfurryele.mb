import React, { createContext, useContext, ReactNode } from 'react';
import { useDeviceType, DeviceType } from '@/hooks/useDeviceType';
import { getAssets, AssetSet } from '@/config/assets';
import { getUIConfig, UIConfigType } from '@/config/uiConfig';

interface DeviceContextType {
  deviceType: DeviceType;
  assets: AssetSet;
  uiConfig: UIConfigType;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const deviceType = useDeviceType();
  const assets = getAssets(deviceType);
  const uiConfig = getUIConfig(deviceType);

  return (
    <DeviceContext.Provider value={{ deviceType, assets, uiConfig }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }
  return context;
};
