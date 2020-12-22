import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app/App';
import { ThemeProvider } from 'styled-components';
import 'normalize.css';
import theme from '../src/app/theme'


ReactDOM.render(
    <ThemeProvider theme = {theme}>
            <App/>
    </ThemeProvider>,
    document.getElementById('root'));
