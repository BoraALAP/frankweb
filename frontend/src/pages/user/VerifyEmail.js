import React from 'react';
import styled from 'styled-components';
import { Primary } from '../../components/UI/Button';

const RESET_PASSWORD = gql`
mutation RESET_PASSWORD(
  $password: String!
  $confirmPassword: String!
  $resetToken: String!
) {
  resetPassword(
    password: $password
    confirmPassword: $confirmPassword
    resetToken: $resetToken
  ) {
    id
    email
    name
  }
}
`;
 
const VerifyEmail = (props) => {
  
  const history = useHistory();
  const location = useLocation().search;

  const { data } = useQuery(CURRENT_USER_QUERY);

  const [verifyEmail, { error, loading, called }] = useMutation(
    VERIFY_EMAIL,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );

  useEffect(() => {
    if (data?.me) {
      history.push("/user/account");
    }
  });
  
  return (
    <Container>
      <Primary>Verify Email</Primary>
    </Container>
  );
};
 
const Container = styled.div`
`;
 
export default VerifyEmail