import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  margin-bottom: 20px;
  background-color: #0a0a0a;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-weight: bold;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  select,
  input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: #1a1a1a;
    color: #ffffff;
    font-weight: bold;
  }
`;
