import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import prism from "prismjs";
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
  }, []);

  async function reviewCode() {
    try {
      const response = await fetch("https://ai-powerd-code-reviewer-backend.onrender.com/ai/get-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.text(); // assuming backend sends plain text/Markdown
      setReivew(data);
    } catch (error) {
      console.error("Review failed:", error);
      setReivew(`**Error:** ${error.message}`);
    }
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
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {reivew}
        </Markdown>
      </div>
    </main>
  );
}

export default App;
