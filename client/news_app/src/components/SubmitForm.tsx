import React, { useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

interface FormListProps {
    tag: string[],
    setValue: React.Dispatch<React.SetStateAction<string[]>>
}

export const SubmitForm: React.FC<FormListProps> = ({ tag, setValue }) => {
    const [tags, setTags] = React.useState(tag)

    useEffect(() => {
        setValue(tags)
    })

    return (
        <React.Fragment>
            <ReactTagInput
                placeholder="入力してください"
                maxTags={4}
                tags={tags}
                onChange={(newTags) => setTags(newTags)}
            />
        </React.Fragment>
    )
}

export default SubmitForm