import React, { Fragment, ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { PauseSvg, PlaySvg } from '~assets/svgR';
import { theme } from '~theme';

interface Props {
  onPress(): void;
  style?: StyleProp<ViewStyle>;
  isPaused?: boolean;
  children?: ReactNode;
}

export const UtilityBtn = ({ onPress, style, isPaused, children }: Props) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {children || (
        <Fragment>
          {isPaused ? (
            <PlaySvg width={24} height={24} fill={theme.palette.text.onLight} />
          ) : (
            <PauseSvg
              width={24}
              height={24}
              fill={theme.palette.text.onLight}
            />
          )}
        </Fragment>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.gray[2],
    paddingVertical: theme.spacing['0.25'],
    paddingHorizontal: theme.spacing['1.5'],
    borderRadius: theme.borderRadius[5],
    ...theme.shadow[12],
  },

  text: {
    color: 'black',
  },
});
