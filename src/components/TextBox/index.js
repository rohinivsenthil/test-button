import React from 'react'

function TextBox({testId, onChange, value}) {
    console.log(value)
    return (
        <div>
            <input type="text" data-testid={testId} value = {value} onChange={(e)=>onChange(e.target.value)}></input>
        </div>
    )
}

export default TextBox
