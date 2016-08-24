import React from 'react'; // import react
import ReactImg from '../images/react.png'; // import image


class Demo extends React.Component {
  render() {
    return <div>
        <h1><i className="iconfont icon-shouye"></i>Demo 这是个component</h1>
        <br/>
        <p className="oh">
          <span className="logo"></span>这是一个react的generator。
        </p>
        <br/>
        <img src={ReactImg} alt="这是个react的图片" className="w100" />
      </div>;
  }
}

export default Demo;
