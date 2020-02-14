import React from 'react';
import {act} from '@testing-library/react-hooks'
import { render, fireEvent, wait, waitForDomChange } from '@testing-library/react';
import Container from '../Container';
import axios from 'axios';
import url from '../../constants/url'


jest.mock('axios', () => ({
    get: jest.fn(() =>({data: {"initialText":"unicorn"}}))
}));

describe('The container component',()=>{
    it('should be rendered correctly',async ()=>{
        const {asFragment}=render(<Container testId='test-cntner'/>)
        await waitForDomChange();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should pass the input text entered to the button', async()=>{
        const {getByTestId}=render(<Container testId='test-cntner' testIdButton='test-btn' testIdTextBox='123'/>)
        await waitForDomChange();
        act(() => {
            fireEvent.change(getByTestId('123'),{target:{value:'Bhumika'}})
            return undefined;
        });
        expect(getByTestId('test-btn')).toHaveTextContent('Bhumika clicked 0 times.');
    })

    it('should display the content from axios.get in the button', async()=>{
        const {getByTestId}=render(<Container testId='test-cntner' testIdButton='test-btn' testIdTextBox='123'/>)
        expect(axios.get).toHaveBeenCalledWith(url.initialTextLink);
        await wait(() => {
            expect(getByTestId('test-btn')).toHaveTextContent('unicorn')
            expect(getByTestId('123').value).toBe('unicorn')
        });

    })

})
