import axios from 'axios';
import React from 'react';
import useInput from './useInput';
import {renderHook, act } from '@testing-library/react-hooks';
import url from '../constants'

describe('the useInput hook', () => {
    
    it ('should make an api call to fetch defaut text and set it in state', async() => {
        const mockAxios = jest.spyOn(axios,'get');
        mockAxios.mockResolvedValue({data:{initialText:'123'}})
        const {result, waitForNextUpdate} = renderHook(() => useInput('defaultValue'))
        await waitForNextUpdate();
        expect(mockAxios).toHaveBeenCalledWith(url);
        expect(result.current[0]).toEqual('123');
    });
    it('should update the text when the setText function is called', async() => {
        const mockAxios = jest.spyOn(axios,'get');
        mockAxios.mockResolvedValue({data:{initialText:'123'}})
        const {
            result,
            waitForNextUpdate
        } = renderHook(() => useInput());
        await waitForNextUpdate();
        expect(result.current[0]).toEqual('123');
        act(() => {
            result.current[1]('newValue');
        });
        expect(result.current[0]).toEqual('newValue');
    });
})
