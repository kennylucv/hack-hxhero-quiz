import styled from "styled-components";
import { MEDIA_QUERIES, theme } from '@homex/hx-component-library';


export const Page = styled.div`
  padding-top: ${theme.spacing.mobile[400]};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  top: 0;
  bottom: 0;

  ${MEDIA_QUERIES.medium}{
    padding-top: ${theme.spacing.desktop[800]};
  }
`;
