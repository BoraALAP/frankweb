import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { CURRENT_USER_QUERY } from "../../queries/User";
import { useHistory } from "react-router-dom";

const Account = (props) => {
  const history = useHistory();
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (!data?.me) {
      history.push("/user/signIn");
    }
  });

  return (
    <Container>
      <p>text</p>
    </Container>
  );
};

const Container = styled.div``;

export default Account;
