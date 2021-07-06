import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style ={{backgroundColor:'#e3f2fd'}}>
            <div className="container-fluid">      

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav">
                  <li className = "nav-items">
                  <a className="nav-link active" aria-current="page" href="/"><b>POSTS</b></a>
                  </li> 
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}
