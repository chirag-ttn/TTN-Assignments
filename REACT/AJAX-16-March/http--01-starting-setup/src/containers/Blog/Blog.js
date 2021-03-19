import React, { Component } from 'react';
import FullPost from './FullPost/FullPost'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import './Blog.css';
import axios from 'axios'
import Posts from './Posts/Posts'
import NewPosts from './NewPost/NewPost'
class Blog extends Component {
    
    
    render () {
        
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink to='/'>Posts</NavLink></li>
                            <li><NavLink to={{pathname:"/new-post",
                                           hash:"#submit",
                                           search:"?quick-submit=true"
                        }}>New Post</NavLink></li>

                        </ul>
                    </nav>
                </header>
                {/* only one route gets excecuted */}
                <Switch>
                <Route path="/new-post" exact component={NewPosts}/>
                <Redirect from='/ab' to='/' />
                
                <Route path="/" component={Posts}/>
                
                </Switch>
                
            </div>
        );
    }
}

export default Blog;