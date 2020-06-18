import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"');

  body{
    font-family: ${({ theme }) => theme.font.family.main};
    font-weight: 600;
    margin: 0;
  }

  small{
    color: ${({ theme }) => theme.color.grey};
  }
  h1{
    font-size: 1.5rem;
  }

  h2{
    font-size: 1.375rem
  }

  h3{
    font-size: 1.25rem
  }

  h4{
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.secondary};
  }
  h5{
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: 0;
    
  }

  h6{
    font-size: 0.875rem;
    line-height: 1rem;
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
    font-size: 0.875rem;
    line-height: 1em;
    font-weight: 400;
  }

  ul{
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    list-style: none;
  li{
    display: grid;
    align-items: baseline;
    font-size: 0.875rem;
    font-weight: 400;
      color: ${({ theme }) => theme.color.grey};
      h5{
        margin: 0;
      }
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
    font-size: 0.875rem;
    box-sizing: border-box;
  }

  
`;

export default GlobalStyle;
