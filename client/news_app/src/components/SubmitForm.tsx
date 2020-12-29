import React from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

interface FormListProps {
    tags: string[]
}

export const SubmitForm: React.FC<FormListProps> = props => {
    const [tags, setTags] = React.useState(props.tags)

    return (
        <React.Fragment>
            <ReactTagInput
                placeholder="入力してください"
                tags={tags}
                onChange={(newTags) => setTags(newTags)}
            />
        </React.Fragment>
    )
}

export default SubmitForm