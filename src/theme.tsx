import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const light = { bg: '#F4F6FB', card: '#FFFFFF', text: '#14172B', sub: '#5B6180', accent: '#5B5BF0', accentSoft: '#E6E6FD', border: '#E3E6F0' };
const dark = { bg: '#0D0F1C', card: '#171A2E', text: '#F2F3FA', sub: '#9AA0C0', accent: '#8B8BFF', accentSoft: '#25284A', border: '#262A47' };
export type Colors = typeof light;

const Ctx = createContext({ colors: light, isDark: false, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setDark] = useState(false);
  useEffect(() => { AsyncStorage.getItem('tema').then(v => v && setDark(v === 'dark')); }, []);
  const toggle = () => setDark(d => { AsyncStorage.setItem('tema', d ? 'light' : 'dark'); return !d; });
  return <Ctx.Provider value={{ colors: isDark ? dark : light, isDark, toggle }}>{children}</Ctx.Provider>;
}
