import React, { useState, useEffect } from 'react'
import SubmitForm from './SubmitForm'
import ArticleList from './ArticleList'
import Axios from 'axios'


export const Home: React.FC = () => {

    const [state, setState] = useState(['新聞'])
    const [article, setArticle] = useState([{ title: '', links: '' }])
    const [content, setContent] = useState({ title: '', links: '' })
    const [result, setResult] = useState([{ comments: '', agrees: '', disagrees: '' }])

    const sendBack = (tags: string[]) => {
        Axios.post('http://0.0.0.0:5000/tags', {
            post_tags: tags
        }).then(function (res) {
            setArticle(res.data.result)
        })
    }

    const commentBack = (articleContent: { title: string, links: string }) => {
        if (articleContent.title != "" || articleContent.links != "") {
            Axios.post('http://0.0.0.0:5000/comment', {
                post_articleConent: articleContent
            }).then(function (res) {
                setResult(res.data.result)
            })
        }
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
        commentBack(content)
    }, [content])

    useEffect(() => {
        console.log(result)
    }, [result])

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