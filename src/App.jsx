import { ThemeProvider } from "styled-components"
import GlobalStyle from "./styles/GlobalStyle"
import theme from "./styles/theme"
import AppRoutes from "./AppRoutes"

function App() {
  	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AppRoutes />
		</ThemeProvider>
  	)
}

export default App
