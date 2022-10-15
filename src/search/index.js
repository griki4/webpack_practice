import React from "react";
import ReactDOM from 'react-dom'
import './search.less'
import luna from './images/luna.jpg'

class Index extends React.Component {
    render() {
        return <div className="search-text">
            Search Text 搜索的图片<img src={ luna }/>
        </div>
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)