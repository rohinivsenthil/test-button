import React from 'react';
import { render, fireEvent, wait, waitForDomChange } from '@testing-library/react';
import {act} from '@testing-library/react-hooks'
import Container from '../Container';
import axios from 'axios';
import url from '../../constants'

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
        const mockAxios = jest.spyOn(axios, 'get');
        mockAxios.mockResolvedValue({data:{initialText:'unicorn'}});
        expect(axios.get).toHaveBeenCalledWith(url);
        await wait(() => {
            expect(getByTestId('test-btn')).toHaveTextContent('unicorn')
            expect(getByTestId('123').value).toBe('unicorn')
        });

    })
    it('Should display the content from the api', async() => {
        const mockAxios = jest.spyOn(axios, 'get');
        mockAxios.mockResolvedValue({data:{initialText:'unicorn'}});

        const {getByTestId}=render(<Container testId='test-cntner' testIdButton='test-btn' testIdTextBox='123'/>)
        expect(mockAxios).toHaveBeenCalledWith(url)
        await wait(() => expect(getByTestId('123').value).toBe('unicorn'));
        await wait(() => expect(getByTestId('test-btn')).toHaveTextContent('unicorn'));
    })
})
