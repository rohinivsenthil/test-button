import {useState, useEffect} from 'react';
import axios from 'axios';
import url from '../constants';

const useInput = (defaultValue) => {
    const [text, setText] = useState(defaultValue);
    useEffect(() => {
        const someFunc = async() => {
            const response = await axios.get(url);
        setText(response.data.initialText)
        }
        someFunc();
        
    },[]);
    return [text,setText];
}
export default useInput;