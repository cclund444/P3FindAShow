// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
 colors: {
   brand: {
     100: "#f7fafc",
     // ...
     900: "#1a202c",
   },
 },
})

// 4. Now you can use these colors in your components
function Usage() {
 return <Box bg="brand.100">Welcome</Box>
}