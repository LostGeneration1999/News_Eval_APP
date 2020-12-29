import React, { useState, useEffect } from 'react'

const LikeButton = () => {
    const [count, counter] = useState(0);
    const [limit, release] = useState(false);

    const countUp = () => {
        counter(count + 1)
    };

    useEffect(() => {
        document.getElementById('counter').addEventListener('click', countUp);
        if (count > 3) {
            counter(0)
        }
        return () => {
            // 毎度Unmountを繰り返す
            document.getElementById('counter').removeEventListener('click', countUp);
        }
        // limitの値が変わった時のみ実行
    }, [limit]);


    return (
        // <>タグ複数</>
        <>
            <button id={"counter"}>いいね数：{count}</button>
            <button onClick={() => release(!limit)}>もっといいねしたい！</button>
            <h3>いいねできる？：{limit}</h3>
        </>
    )
}

export default LikeButton