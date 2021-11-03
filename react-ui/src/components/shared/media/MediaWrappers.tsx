import { MEDIA_QUERIES } from '@homex/hx-component-library';
import styled from 'styled-components';

export enum BreakpointType {
  MAX = 'max',
  MIN = 'min',
}

interface IIsCustomBreakpointProps {
  breakpoint: string;
  type?: BreakpointType;
}

export const IsCustomBreakpoint = styled.div(
  ({ breakpoint, type = BreakpointType.MIN }: IIsCustomBreakpointProps) => {
    const isMin = type === BreakpointType.MIN;

    return `
      width:100%;
      ${isMin ? 'display: none;' : ''}
      @media screen and (min-width: ${breakpoint}) {
        display: ${isMin ? 'block' : 'none'};
      }
      `;
  }
);

export const IsLargeAndAbove = styled.div`
  display: none;

  width: 100%;
  ${MEDIA_QUERIES.large} {
    display: block;
  }
`;
export const IsLargeAndBelow = styled.div`
  width: 100%;

  ${MEDIA_QUERIES.large} {
    display: none;
  }
`;

export const IsMediumAndAbove = styled.div`
  display: none;

  width: 100%;
  ${MEDIA_QUERIES.medium} {
    display: block;
  }
`;
export const IsMediumAndBelow = styled.div`
  width: 100%;

  ${MEDIA_QUERIES.medium} {
    display: none;
  }
`;
export const IsSmallAndAbove = styled.div`
  display: none;
  width: 100%;

  ${MEDIA_QUERIES.small} {
    display: block;
  }
`;

export const IsSmallAndBelow = styled.div`
  width: 100%;

  ${MEDIA_QUERIES.small} {
    display: none;
  }
`;
