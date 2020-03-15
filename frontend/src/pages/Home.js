import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $lastName: String!
    $pets: [String]
    $posts: PostCreateManyInput
  ) {
    createUser(name: $name, lastName: $lastName, pets: $pets, posts: $posts) {
      name
      lastName
      pets
      posts {
        title
        text
      }
    }
  }
`;

// const CREATE_POST_MUTATION = gql`
//   mutation CREATE_POST_MUTATION {
//     createPost(title: "bora", text: "alap") {
//       id
//     }
//   }
// `;

const USERS_QUERY = gql`
  {
    users {
      name
      lastName
    }
  }
`;

const Home = props => {
  const [state, setState] = useState({ name: "", lastName: "" });
  const [createUser, { data, loading, error }] = useMutation(
    CREATE_USER_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  console.log(data, loading, error);

  return (
    <Container>
      <form
        data-test="form"
        onSubmit={async e => {
          // Stop the form from submitting
          e.preventDefault();
          // call the mutation
          const res = await createUser({
            variables: {
              name: "asdas",
              lastName: "asdas",
              pets: ["test", "test"],
              posts: {
                create: [
                  { title: "test2", text: "testtt22" },
                  { title: "123", text: "12312" }
                ]
              }
            }
          });
          // change them to the single item page
          console.log(res);
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="name">
            name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              required
              value={state.name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="lastName">
            lastName
            <input
              type="type"
              id="lastName"
              name="lastName"
              placeholder="lastName"
              required
              value={state.lastName}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </Container>
  );
};

const Container = styled.div``;

export default Home;
