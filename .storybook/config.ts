import { configure } from '@storybook/react';
import './carbon.css';

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.(js|ts)x?$/), module);
