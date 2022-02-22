import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const NextSvg = (props: SvgProps) => (
  <Svg aria-hidden="true" viewBox="0 0 24 24" data-testid="RedoIcon" {...props}>
    <Path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
  </Svg>
);
