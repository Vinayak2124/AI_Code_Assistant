import { useState, useEffect, lazy, Suspense } from 'react';
import 'prismjs/themes/prism-tomorrow.css'
import Editor from "react-simple-code-editor"
import axios from 'axios'
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css"
import prism from "prismjs"
import './App.css'

function App() {

  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
 const Markdown = lazy(() => import("react-markdown"));

const [RehypeHighlight, setRehypeHighlight] = useState(null);
  useEffect(() => {
  import("rehype-highlight").then((mod) => setRehypeHighlight(() => mod.default));
}, []);
  useEffect(() => {
    prism.highlightAll()
  })

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", { code })
    console.log(response.data)
    setOutput(response.data)
  }

  return (
    <>
      <div className='Welcome'>
         <h1>Hello, Developers..!</h1>
      <h2>How Can I Assist You Today ?</h2>
      </div>
      <main>
     
        <div className='left'>
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.js, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"fira code","Fira Mono",monospace',
                fontSize: 18,
                
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width:"100%"
              }}
            
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        
<div className='right'>
  <Suspense fallback={<div>Loading Output...</div>}>
    {RehypeHighlight ? (
      <Markdown rehypePlugins={[RehypeHighlight]}>{output}</Markdown>
    ) : (
      <div>Loading Markdown...</div>
    )}
  </Suspense>
</div>
    </main>
    </>
  )
}

export default App
