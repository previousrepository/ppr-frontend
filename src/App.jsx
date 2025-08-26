import Routes from "./routes/routes.jsx";
import ToastContainerWrapper from "./components/ui/ToastContainerWrapper.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";

function App() {
  return (
    <div className="bg-ppr-glow">
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <Routes />
            <ToastContainerWrapper />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
