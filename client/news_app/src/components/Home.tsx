import React, { useState } from 'react'
import SubmitForm from './SubmitForm'
import ArticleList from './ArticleList'
import Axios from 'axios'


export const Home: React.FC = () => {

    const [state, setState] = useState(['新聞'])
    const [article, setArticle] = useState([{ title: '', links: '' }])

    const sendBack = (tags: string[]) => {
        Axios.post('http://0.0.0.0:5000/tags', {
            post_tags: tags
        }).then(function (res) {
            setArticle(res.data.result)
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
            <div>
                <ArticleList articles={article} />
            </div>
        </>
    )
}

export default Home;