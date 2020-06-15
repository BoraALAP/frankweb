import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Raleway:400,500,600,700&display=swap');

  body{
    font-family: ${({ theme }) => theme.font.family.main};
    font-weight: 600;
    margin: 0;
  }

  small{
    color: ${({ theme }) => theme.color.grey};
  }
  h1{
    font-size: 1.5em;
  }

  h2{
    font-size: 1.375em
  }

  h3{
    font-size: 1.25em
  }

  h4{
    font-size: 1.125em;
    font-weight: 600;
    color: ${({ theme }) => theme.color.secondary};
  }
  h5{
    font-size: 1em;
    font-weight: 600;
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: 0;
    
  }

  h6{
    font-size: 0.875em;
    font-weight: 600;
    margin-top: 1em;
    margin-bottom: 1.5em;
    color: ${({ theme }) => theme.color.black};
    span{
      font-weight: 400;
      color: ${({ theme }) => theme.color.grey};
    }
  }

  p{
    font-size: 0.875em;
    font-weight: 400;
  }

  ul{
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    list-style: none;
  li{
    font-size: 0.875em;
    font-weight: 400;
      color: ${({ theme }) => theme.color.grey};
  }
}

  a{
    text-decoration: none;
  }
  button{
   
    &:disabled{
      background-color: ${({ theme }) => theme.color.grey};
      border: none;
      color: ${({ theme }) => theme.color.lightGrey};
    }
  }

  form{
    display: grid;
    justify-content:center;
    h1, h2, h3 {
      margin:0
    }
  }

  input{
    padding: ${({ theme }) => theme.buttonPadding}; 
    border: 1px solid ${({ theme }) => theme.color.grey};
    min-height: 32px;
    font-size: 0.875em;
    box-sizing: border-box;
  }

  
`;

export default GlobalStyle;
