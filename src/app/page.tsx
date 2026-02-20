'use client'

import { Text } from "../components/Text/Text";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return <div className="page">
    <Text weight={500} color="primary.main" variant="body2" gutterBottom>
      Dashboard 3S
    </Text>
    <button onClick={toggleTheme}>Trocar tema para {theme === 'light' ? 'dark' : 'light'}</button>
  </div>;
}
