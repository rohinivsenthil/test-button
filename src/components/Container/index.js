import React from 'react';
import Button from '../Button';
import TextBox from '../TextBox';
import useInput from '../../hooks/useInput'

const Container = (props) => {
    const [text, setText] = useInput('');
    const [status] = useInput(true);

    const {testId,testIdButton,testIdTextBox}=props;
    return (
        <div data-testid={testId}>
            <TextBox disable={status} onChange={{status}? ()=>{} : (inputTextValue) => setText(inputTextValue)} testId={testIdTextBox} value = {text}/>
            <Button text={text} buttonType="round" testId={testIdButton} click = {() => {}}/>
        </div>
    );
}

export default Container
