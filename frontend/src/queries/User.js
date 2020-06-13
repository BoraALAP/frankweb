import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export { CURRENT_USER_QUERY };
