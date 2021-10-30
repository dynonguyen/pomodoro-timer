import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Background() {
  const classes = useStyles();
  return (
    <div id="bubbleWrap" className={classes.root}>
      {new Array(10).fill(0).map((_, index) => (
        <div className={`bubble x${index + 1}`}></div>
      ))}
    </div>
  );
}

export default Background;
