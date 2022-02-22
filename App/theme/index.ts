const baseSpacing = 16;

export const theme = {
  outerPadding: baseSpacing,
  spacing: {
    '0.25': baseSpacing * 0.25,
    '0.5': baseSpacing * 0.5,
    1: baseSpacing * 1,
    '1.5': baseSpacing * 1.5,
  },

  palette: {
    text: {
      onDark: '#eee',
      onLight: '#333',
    },

    black: {
      def: '#212121',
    },

    blue: {
      3: '#2196f3',
    },

    gray: {
      0: '#fafafa',
      1: '#eeeeee',
      2: '#bdbdbd',
      3: '#757575',
      4: '#424242',
    },

    red: {
      0: '#ffcdd2',
      1: '#e57373',
      2: '#f44336',
      3: '#d32f2f',
      4: '#b71c1c',
    },

    green: {
      0: '#c8e6c9',
      1: '#81c784',
      2: '#4caf50',
      3: '#388e3c',
      4: '#1b5e20',
    },
  },

  borderRadius: {
    5: 5,
  },

  shadow: {
    '12': {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
  },
};
