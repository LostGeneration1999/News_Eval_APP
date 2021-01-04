import React, { useState } from 'react'


interface ArticlesProps {
    articles:
    {
        title: string;
        links: string;
    }[],
    setContent: React.Dispatch<React.SetStateAction<{
        title: string;
        links: string;
    }>>
}

export const Articles: React.FC<ArticlesProps> = ({ articles, setContent }) => {

    const pushButton = (v: number) => {
        setContent(articles[v])
    }

    return (
        <React.Fragment>
            {articles.map((article, index) => (
                <div>
                    <p onClick={() => pushButton(index)} key={index}>
                        {article.title}
                    </p>

                </div>
            ))}
        </React.Fragment>
    )

}

export default Articles