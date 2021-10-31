import { useMediaQuery, useTheme } from '@mui/material';

function useMobile(): boolean {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return isMobile;
}

export default useMobile;
