import styled from 'styled-components';

interface FlexProps {
  column?: boolean;
}

export default styled.div<FlexProps>`
  display: flex;
  flex-direction: ${p => p.column && 'column'};
`;
