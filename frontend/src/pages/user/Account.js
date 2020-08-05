import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { CURRENT_USER_QUERY } from "../../queries/User";
import { useHistory } from "react-router-dom";

import SignOut from "./SignOut";
import UserDashboard from "./component/UserDashboard";
import DealerDashboard from "./component/DealerDashboard";

const Account = (props) => {
  const history = useHistory();
  const { data } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (!data?.me) {
      history.push("/user/signIn");
    }
  });

  return (
    <Container>
      <h2>{data?.me?.name}</h2>
      <SignOut />
      {data?.me?.permissions.map(item => {
        if (item === "DEALER") {
          return <DealerDashboard />
        } else if (item === "USER") {
          return <UserDashboard />  
        }
      })}
    </Container>
  );
};

const Container = styled.div``;

export default Account;
