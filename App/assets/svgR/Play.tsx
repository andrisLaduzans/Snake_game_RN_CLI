import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const PlaySvg = (props: SvgProps) => (
  <Svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="PlayArrowIcon"
    {...props}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
);
