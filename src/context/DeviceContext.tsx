import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useDeviceType, DeviceType } from '@/hooks/useDeviceType';
import { getAssets, AssetSet } from '@/config/assets';
import { getUIConfig, UIConfigType } from '@/config/uiConfig';

interface DeviceContextType {
  deviceType: DeviceType;
  assets: AssetSet;
  uiConfig: UIConfigType;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

interface DeviceProviderProps {
  children: ReactNode;
  forcedDeviceType?: DeviceType;
}

export const DeviceProvider = ({ children, forcedDeviceType }: DeviceProviderProps) => {
  const autoDeviceType = useDeviceType();
  
  // Use forced device type if provided, otherwise use auto-detected
  const deviceType = forcedDeviceType ?? autoDeviceType;
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
