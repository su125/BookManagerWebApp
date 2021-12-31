import React, { Component } from 'react'
class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav >
                    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/Authors">Authors</a></li>
      <li><a href="/Categories">Category</a></li>
    </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
