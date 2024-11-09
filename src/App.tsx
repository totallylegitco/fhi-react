import "@mantine/core/styles.css";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Router } from "./Router";

const theme: MantineThemeOverride = {
  colors: {
    // Define your custom colors here if needed
  },
  // white: '#eff3f0',
};

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
