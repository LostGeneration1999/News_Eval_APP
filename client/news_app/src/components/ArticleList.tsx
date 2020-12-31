import React from 'react'

interface ArticlesProps {
    articles:
    {
        title: string;
        links: string;
    }[]
}


export const Articles: React.FC<ArticlesProps> = ({ articles }) => {

    return (
        <React.Fragment>
            {articles.map((article) => (
                <button>{article.title}</button>
            ))}
        </React.Fragment>
    )

}

export default Articles