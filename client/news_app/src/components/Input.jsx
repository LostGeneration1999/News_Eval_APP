import React, { useState } from 'react'
import LikeButton from './LikeButton'

const Input = (props) => {
    // 変数, 関数
    const [isPublished, togglePublished] = useState(false);


    return (
        <div>
            <h2>{props.title}</h2>
            <label htmlFor="check">公開状態：</label>
            <input type="checkbox" id="check" onClick={() => togglePublished(!isPublished)} />
            <LikeButton />
        </div>
    );
}

export default Input