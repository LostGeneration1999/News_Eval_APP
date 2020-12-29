import React from 'react'
import SubmitForm from './SubmitForm'
import SubmitButton from './SubmitButton'


export const Submit: React.FC = () => {
    return (
        <div>
            <SubmitForm tags={['hoge']} />
        </div>
    )
}

export default Submit;