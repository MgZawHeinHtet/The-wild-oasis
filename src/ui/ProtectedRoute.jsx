import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullSize = styled.div`
    height : 100vh;
    background-color : var(--color-grey-50);
    display : flex;
    justify-content : center;
    align-items : center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //   1. load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //   2. If there is NO authenticated user,redirect to the login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) return navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //   3. while loading,show a spinner
  if (isLoading)
    return (
      <FullSize>
        <Spinner />
      </FullSize>
    );

  //   $. If there is a user,render the app

  if(isAuthenticated) return children;
}

export default ProtectedRoute;
