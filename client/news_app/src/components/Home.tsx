import React, { useState, useEffect } from 'react'
import SubmitForm from './SubmitForm'
import ArticleList from './ArticleList'
import Axios from 'axios'


export const Home: React.FC = () => {

    const [state, setState] = useState(['新聞'])
    const [article, setArticle] = useState([{ title: '', links: '' }])
    const [content, setContent] = useState({ title: '', links: '' })

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

    useEffect(() => {
        console.log(content)
    }, [content])

    return (
        <>
            <form>
                <SubmitForm tag={state} setValue={setState} />
            </form>
            <div>
                <button onClick={submitFormSend}>送信</button>
            </div>
            <div>
                <ArticleList articles={article} setContent={setContent} />
            </div>
        </>
    )
}

export default Home;