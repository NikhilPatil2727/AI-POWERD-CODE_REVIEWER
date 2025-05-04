import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import prism from "prismjs";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`
    function add(a, b) {
      return a + b;
    }
  `);
  const [reivew, setReivew] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []); // Runs only once on mount
  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", { code });
    setReivew(response.data);
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              borderRadius: "5px",
              width: "100%",
              height: "100%",
              border: "1px solid #ddd",

            }}
          />
        </div>
        <div className="review" onClick={reviewCode}>Review</div>
      </div>
      <div className="right">
        <Markdown
        rehypePlugins={[rehypeHighlight]}
        
        >{reivew}</Markdown>
      </div>
    </main>
  );
}

export default App;
