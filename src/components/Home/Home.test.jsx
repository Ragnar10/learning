// Core
import { render } from '@testing-library/react';
// Components
import { Home } from './index';

describe('Home component', () => {
    it('Home render', () => {
        render(<Home />);
    });
});
