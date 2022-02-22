import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const PauseSvg = (props: SvgProps) => (
  <Svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="PauseIcon"
    {...props}>
    <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </Svg>
);
