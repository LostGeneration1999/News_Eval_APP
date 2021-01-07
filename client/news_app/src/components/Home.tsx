import React, { useState, useEffect } from 'react'
import SubmitForm from './SubmitForm'
import ArticleList from './ArticleList'
import Axios from 'axios'
import Button from '@material-ui/core/Button'


export const Home: React.FC = () => {

    // メイン画面の表示
    const [status, setStatus] = useState('タグを入力してください')
    // 検索するタグ
    const [state, setState] = useState(['政治'])
    // 一覧表示する記事
    const [article, setArticle] = useState([{ pid: '', title: '', links: '' }])
    // コメント取得するする記事
    const [content, setContent] = useState({ pid: 'initial', title: '', links: '' })
    // 返り値として受け取るコメント結果
    const [result, setResult] = useState([{ comments: '', agrees: '', disagrees: '' }])
    // ネガポジ判定の結果
    const [response, setResponse] = useState({ negative: 0.0, positive: 0.0 })

    const sendBack = (tags: string[]) => {
        Axios.post('http://0.0.0.0:5000/tags', {
            post_tags: tags
        }).then(function (res) {
            setArticle(res.data.article)
        })
    }

    const commentBack = (articleContent: { title: string, links: string }) => {
        if (articleContent.title != "" || articleContent.links != "") {
            setStatus('コメント取得中・・・')
            Axios.post('http://0.0.0.0:5000/comment', {
                post_articleConent: articleContent
            }).then(function (res) {
                setResult(res.data.result)
                setStatus('ネガポジ判定ボタンを押してください')
            })
        }
    }

    const negaPosiEval = () => {
        if (content.title != "" || content.links != "") {
            setStatus('ネガポジ判定中・・・')
            Axios.post('http://0.0.0.0:5000/eval', {
                comment: result
            }).then(function (res) {
                setResponse(res.data.response)
            })
        } else {
            alert('記事を選択してください')
        }
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

    // 記事選択完了
    useEffect(() => {
        commentBack(content)
    }, [content])

    useEffect(() => {
        setStatus('記事を選択してください')
    }, [response])

    return (
        <>
            <h1>{status}</h1>
            <h3>選択記事：「{content.title}」</h3>
            <h4>negative: {response.negative} | positive: {response.positive}</h4>
            <div>
                <form>
                    <SubmitForm tag={state} setValue={setState} />
                    <Button onClick={submitFormSend} variant="contained" color="primary">記事検索</Button>
                </form>
            </div>

            <div>
                <Button onClick={negaPosiEval} variant="contained" color="primary">ネガポジ判定</Button>
            </div>
            <div>
                <ArticleList articles={article} setContent={setContent} />
            </div>
        </>
    )
}

export default Home;