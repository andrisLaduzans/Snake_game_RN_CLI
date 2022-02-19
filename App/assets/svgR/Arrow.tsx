import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ArrowSvg = (props: SvgProps) => (
  <Svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ArrowRightAltIcon"
    {...props}>
    <Path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
  </Svg>
);
