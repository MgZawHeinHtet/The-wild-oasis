import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styled from "styled-components";
import Button from "./ui/Button";
import Input from "./ui/Input";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Applayout from "./ui/Applayout";
import { Toaster } from "react-hot-toast";
import Booking from "./features/bookings/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const StyledApp = styled.div`
  background-color: orange;
  padding: 20px;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route
              element={
                <ProtectedRoute>
                  <Applayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />}></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="bookings/:bookingId" element={<Booking />}></Route>
              <Route path="checkin/:bookingId" element={<Checkin />}></Route>
              <Route path="cabins" element={<Cabins />}></Route>
              <Route path="users" element={<NewUsers />}></Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="account" element={<Account />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={8}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
