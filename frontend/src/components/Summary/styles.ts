import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
  padding: 0rem 2rem;

  div {
    background: ${lighten(0.1, '#000000')};
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: #ffffff;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      font-size: 2rem;
      font-weight: 600;
      line-height: 3rem;
      margin-top: 1rem;
    }

    &.highlight-background {
      background: #015f43;
    }
  }
`;
