import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  background-color: rgba(0, 0, 0, 0.5);
  width: 400px;
  border-radius: 0.5rem;
  border: 1px solid white;
  display: flex;
  padding: 3rem 1rem;
  flex-direction: column;

  h2 {
    color: var(--text-base);
    text-align: center;
    font-size: 1.2rem;
  }

  input {
    margin: 10px;
    padding: 10px;
    border: 1px solid #fff;
    color: var(--text-base);
    border-radius: 4px;

    &::placeholder {
      color: #fff;
    }
  }

  button,
  a {
    margin: 10px;
    padding: 10px;
    border: 1px solid var(--green-dark);
    border-radius: 4px;
    background-color: var(--green-dark);
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    text-align: center;
  }

  p {
    color: #fff;
    text-align: center;
  }
`;
