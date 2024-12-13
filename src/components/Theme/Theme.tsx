import { createTheme } from '@mantine/core';

export const theme = createTheme({
  components: {
    Button: {
      defaultProps: {
        variant: 'filled',
        radius: 'md',
      },
      styles: () => ({
        root: {
          backgroundImage: 'linear-gradient(115deg, #225933, #408051, #0c401c)',
          margin: '10px',
          padding: '5px 25px',
          textAlign: 'center',
          transition: '0.5s',
          backgroundSize: '200% auto',
          color: 'white',
          boxShadow: '0 0 20px #eee',
          borderRadius: '5px',
          display: 'block',
          border: 'none',
          backgroundPosition: 'left center',
          '&:hover': {
            backgroundPosition: 'right center',
            color: '#fff',
            textDecoration: 'none',
          },
        },
      }),
    },
  },
});
