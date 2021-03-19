import React ,{Component} from 'react';
import axios from '../../../axios'
import Post from '../../../components/Post/Post'
import {Route} from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
import './Posts.css'
class Posts extends Component{
    state={
        posts:[],
        
    }
    postSelectedHandler = (id)=>{
        
        this.props.history.push({pathname:'/'+id})
        
    }
    componentDidMount(){
        console.log(this.props)
        axios.get('/posts')
        .then((response)=>{
            const posts = response.data.slice(0,4)
            const updatedPosts = posts.map(post=>{
                return{
                    ...post,
                    author:'Max'
                }
            })
            this.setState({posts:updatedPosts})
            
        })
    }
    
    render()
    {
        const posts = this.state.posts.map(post=>
            
            
            
                
            <Post 
            key={post.id}
            title={post.title} 
            author={post.author}
            clicked={()=> {this.postSelectedHandler(post.id)}} />
            
            
            
    )
        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url+':id'} component={FullPost}/>
            </div>
            
        )
    }
}

export default Posts;