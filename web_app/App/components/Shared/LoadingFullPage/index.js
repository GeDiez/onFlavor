import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingFullPage = ({ visible }) =>
  visible && (
    <div
      style={{
        position: 'fixed',
        height: '80%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(220, 220, 220, .5)',
        zIndex: 2,
      }}
    >
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <CircularProgress size={80} thickness={5} />
      </MuiThemeProvider>
    </div>
  );

export default LoadingFullPage;
