import React, { Component } from 'react'
import axios from 'axios';


export default class EditPost extends Component {
   

    constructor(props){
        super(props);
        this.state={

            topic:"",
            description:"",
            postCategory:""

        }
    }
    //whenever a value is changed, values will be updated by this
    handleInputChange = (e) =>{
        const{name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value

        })
    }
    
    onSubmit =(e) =>{

        e.preventDefault();

        const id = this.props.match.params.id;

        const{topic,description,postCategory} = this.state;

        const data ={
            topic:topic,
            description:description,
            postCategory:postCategory
        }

        console.log(data);
        //predefined hit point for updating existing post
        axios.put(`/post/update/${id}`,data).then((res)=>{
            if(res.data.success){
                alert("Post updated successfully")
                this.setState({
                    topic:"",
                    description:"",
                    postCategory:"",                
                })   
            }
        })
    }
    
   
    componentDidMount(){
        //post id is catched here
        const id = this.props.match.params.id;

        axios.get(`/post/${id}`).then((res)=>{
            
            if(res.data.success){
                this.setState({
                    topic: res.data.post.topic,
                    description: res.data.post.description,
                    postCategory: res.data.post.postCategory
                });

                console.log(this.state.post);
            }
        });
    }
   
   
   
   
   
   
   
   
    render() {
        return (
            <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Edit post</h1>
            <form >
                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label for = "topic" style={{marginBottom:'5px'}} >Topic</label>
                    <input type="text"
                    className = "form-control"
                    name="topic"
                    placeholder="Enter topic"
                    value={this.state.topic}
                    onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label for="description" style={{marginBottom:'5px'}}>Description</label>
                    <input type="text"
                    className = "form-control"
                    name="description"
                    placeholder="Enter description"
                    value={this.state.description}
                    onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label for = "postCategory" style={{marginBottom:'5px'}}>Post category</label>
                    <input type="text"
                    className = "form-control"
                    name="postCategory"
                    placeholder="Enter post category"
                    value={this.state.postCategory}
                    onChange={this.handleInputChange}/>
                </div>

                <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                        &nbsp;Update post
                    
                </button>

            </form>
        </div>

        )
           
    }
}
