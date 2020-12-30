import React, { useState } from 'react'
import SubmitForm from './SubmitForm'
import Axios from 'axios'

export const Submit: React.FC = () => {

    const [state, setState] = useState(['新聞'])

    const sendBack = (tags: string[]) => {
        Axios.post('http://127.0.0.1:5000/tags', {
            post_tags: tags
        }).then(function (res) {
            alert(res.data.result)
        })
    }

    const submitFormSend = (e: React.MouseEvent) => {
        e.persist();
        e.preventDefault();
        const error = Object.values(state).some((value) => {
            return value.length === 0;
        })

        setState(state)
        sendBack(state)

        if (error) {
            alert('未入力項目があります');
        }
    }

    return (
        <>
            <form>
                <SubmitForm tag={state} setValue={setState} />
            </form>
            <div>
                <button onClick={submitFormSend}>送信</button>
            </div>
        </>
    )
}

export default Submit;