import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
// import parser from "html-react-parser";

const LongDescription = ({ text, settext }) => {

    const handleEditorChange = content => {
        // console.log(content);
        settext(content)
    };
    // console.log(text)

    return (
        <div>
            <SunEditor showToolbar={true}
                setDefaultStyle="height: 300px"
                setContents={text}
                contentEditable={true}
                setOptions={{
                    buttonList: [
                        ['undo', 'redo'],
                        ['bold', 'underline', 'italic'],
                        ['fontColor', 'hiliteColor', 'textStyle', 'strike'],
                        ['list', 'align', 'fontSize', 'formatBlock', 'blockquote'],
                        ['preview', 'fullScreen'],
                        ['link', 'image', 'video'],


                    ],

                }}
                onChange={handleEditorChange}
            />
            {/* <div>
                {parser(text)}
            </div> */}
        </div>
    );
};

export default LongDescription;