import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

function useMobile(size: Breakpoint = 'xs'): boolean {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(size));

  return isMobile;
}

export default useMobile;
