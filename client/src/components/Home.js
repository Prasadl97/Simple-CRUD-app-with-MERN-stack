import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
 constructor(props){
   super(props);

   //when get request is sent, the posts will come to this array
    this.state={
      posts:[]
    };
 } 

//this will execute when all posts from backend are rendered
componentDidMount(){
  this.retrievePosts();
}
  
 retrievePosts(){
   axios.get("http://localhost:8000/posts").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });
      
      console.log(this.state.posts)
    }

   });
 }

 onDelete =(id) =>{

        axios.delete(`/post/delete/${id}`).then((res) =>{

            alert("Post Deleted Successfully");
            this.retrievePosts();
        })

 }


filterData(posts,searchKey){

    const result = posts.filter((post) =>
    //search by topic or description or postcategory
    post.topic.toLowerCase().includes(searchKey)||
    post.description.toLowerCase().includes(searchKey)||
    post.postCategory.toLowerCase().includes(searchKey)

    )
    this.setState({posts:result})
}



 //values are checked each time when updating
 handleSearchArea = (e) =>{

    const searchKey = e.currentTarget.value;

      axios.get("/posts").then(res =>{
       if(res.data.success){
       
        this.filterData(res.data.existingPosts,searchKey)
        
       }
   
      });
 }
  
  
 //when the buttton is clicked, it will get the id relevent to that post 
 render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Posts</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">

           <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}>
              </input>

          </div>
        </div>
        <table className="table table-hover" style={{marginTop:'40px'}}>
            <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Description</th>
                  <th scope="col">Post Catergory</th>
                  <th scope="col">Action</th>
                 </tr>
            </thead>
                <tbody>
                  {this.state.posts.map((posts,index)=>(
                      <tr key={index}>
                        <th scope="row">{index+1}</th>

                        <td>             
                          <a href={`/post/${posts._id}`} style ={{textDecoration:'none'}}>
                          {posts.topic}
                          </a>
                        </td>

                        <td>{posts.description}</td>
                        <td>{posts.postCategory}</td>
                        <td>
                            <a className = "btn btn-warning" href={`/edit/${posts._id}`}>
                              <i className = "fas fa-edit"></i>&nbsp;Edit
                            </a>
                            &nbsp;
                            <div className = "btn btn-danger" onClick={() =>this.onDelete(posts._id)}>
                              <i className = "far fa-trash-alt"></i>&nbsp;Delete
                            </div>
                        </td>
                      </tr>
                  ))}
                  </tbody>
            </table>

            <button className="btn btn-success"> <a href = "/add" style = {{textDecoration:'none',color:'white'}}>Create New Post</a></button>
      </div>
    )
  }
}
