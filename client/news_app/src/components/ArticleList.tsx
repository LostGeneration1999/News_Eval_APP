import React, { useState } from 'react'
import MaterialTable from 'material-table';

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

    const pushButton = (articles: {
        pid: string;
        title: string;
        links: string;
    }) => {
        setContent(articles)
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
            {/* {checkLink(articles[0].links)( */}
            < MaterialTable
                columns={[
                    { title: '記事タイトル', field: 'title' },
                ]}
                data={articles}
                options={{
                    showTitle: false,
                }}
                actions={[
                    {
                        icon: 'done',
                        tooltip: 'Edit Item',
                        // any型は良くない
                        onClick: (_: any, rowData: any): void =>
                            pushButton(rowData),
                    },
                ]}
            />
            {/* )} */}
        </React.Fragment>
    )

}

export default Articles