import React from "react";
import "./App.css";

// 引入 container 组件 CountCon
import CountCon from "./container/CountCon";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CountCon />
      </div>
    );
  }
}

export default App;
