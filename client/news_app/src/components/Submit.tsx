import React, { useState } from 'react'
import SubmitForm from './SubmitForm'
import Axios from 'axios'

export const Submit: React.FC = () => {

    const [state, setState] = useState(['新聞'])

    const sendBack = (tags: string[]) => {
        Axios.post('http://0.0.0.0:5000/tags', {
            post_tags: tags
        }).then(function (res) {
            console.log(res.data.result[25])
            alert('OK')
        })
    }

    const submitFormSend = (e: React.MouseEvent) => {
        e.persist();
        e.preventDefault();
        setState(state)
        if (state.length == 0) {
            alert('タグを入力してください');
        } else {
            sendBack(state)
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