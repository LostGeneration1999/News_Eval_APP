import React, { useState, useEffect } from 'react'
import SubmitForm from './SubmitForm'
import ArticleList from './ArticleList'
import Axios from 'axios'


export const Home: React.FC = () => {

    const [status, setStatus] = useState('タグを入力してください')
    const [state, setState] = useState(['政治'])
    const [article, setArticle] = useState([{ title: '', links: '' }])
    const [content, setContent] = useState({ title: '', links: '' })
    const [result, setResult] = useState([{ comments: '', agrees: '', disagrees: '' }])
    let negative = undefined
    let positive = undefined

    const sendBack = (tags: string[]) => {
        Axios.post('http://0.0.0.0:5000/tags', {
            post_tags: tags
        }).then(function (res) {
            setArticle(res.data.result)
        })
    }

    const commentBack = (articleContent: { title: string, links: string }) => {
        if (articleContent.title != "" || articleContent.links != "") {
            setStatus('コメント取得中・・・')
            Axios.post('http://0.0.0.0:5000/comment', {
                post_articleConent: articleContent
            }).then(function (res) {
                setResult(res.data.result)
            })
        }
    }

    const negaPosiEval = () => {
        Axios.post('http://0.0.0.0:5000/eval', {
            comment: result
        }).then(function (res) {
            negative = res.data.response['negative']
            positive = res.data.response['positive']
        })
    }

    const submitFormSend = (e: React.MouseEvent) => {
        e.persist();
        e.preventDefault();
        setState(state)
        if (state.length == 0) {
            alert('タグを入力してください');
        } else {
            setStatus('記事を選択してください')
            sendBack(state)
        }
    }

    useEffect(() => {
        commentBack(content)
    }, [content])

    useEffect(() => {
        setStatus('ネガポジ判定ボタンを押してください')
    }, [result])

    return (
        <>
            <h1>{status}</h1>
            <h3>選択記事：「{content.title}」</h3>
            <h4>negative: {negative} | positive: {positive}</h4>
            <form>
                <SubmitForm tag={state} setValue={setState} />
            </form>
            <div>
                <button onClick={submitFormSend}>記事検索</button>
            </div>
            <div>
                <button onClick={negaPosiEval}>ネガポジ判定</button>
            </div>
            <div>
                <ArticleList articles={article} setContent={setContent} />
            </div>
        </>
    )
}

export default Home;