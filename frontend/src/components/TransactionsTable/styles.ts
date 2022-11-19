import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3rem;

  table {
    width: 90%;
    margin: 0 auto;
    border-spacing: 0 0.5rem;
  }

  th {
    color: var(--text-base);
    font-weight: 700;
    padding: 1rem 2rem;
    text-align: left;
    line-height: 1.5rem;
  }

  td {
    padding: 1rem 2rem;
    background: #0a0a0a;
    color: var(--text-secondary);

    &:first-child {
      border-radius: 0.5rem 0 0 0.5rem;
    }

    &:last-child {
      border-radius: 0 0.5rem 0.5rem 0;
    }

    &.cashOut {
      color: green;
    }

    &.cashIn {
      color: red;
    }
  }
`;
