import Router from "./Router.tsx";
import {SnackbarProvider} from "notistack";

function App() {

  return (
      <>
          <SnackbarProvider />
          <Router />
      </>
  )
}

export default App
