import React, { useState } from 'react'


interface ArticlesProps {
    articles:
    {
        pid: string;
        title: string;
        links: string;
    }[],
    setContent: React.Dispatch<React.SetStateAction<{
        pid: string;
        title: string;
        links: string;
    }>>
}

export const Articles: React.FC<ArticlesProps> = ({ articles, setContent }) => {

    const pushButton = (v: number) => {
        setContent(articles[v])
    }

    function checkLink(link: string): boolean {
        if (link == "") {
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <React.Fragment>
            {articles.map((article, index) =>
            (
                <div>
                    {checkLink(article.links)
                        ? (
                            <p onClick={() => pushButton(index)} key={article.pid}>
                                {index + 1}　：　{article.title}
                            </p>
                        ) : (
                            <p key={index}>記事を検索してください</p>
                        )}

                </div>
            ))}
        </React.Fragment>
    )

}

export default Articles