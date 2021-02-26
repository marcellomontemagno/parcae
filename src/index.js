import React from 'react';
import ReactDOM from 'react-dom';
import UI from "./module/examples/ui/UI"

const div = document.createElement("div");
div.setAttribute("id", "react-root");
document.body.appendChild(div);

ReactDOM.render(<UI/>, div);
