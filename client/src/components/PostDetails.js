import React, { Component } from 'react'
import axios from 'axios'

//data will be fetched relevent to that specific post when the topic is clicked
export default class PostDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            post:{}//data will be fetched as an object and saved here
        };
    }

    componentDidMount(){
        //post id is catched here
        const id = this.props.match.params.id;

        axios.get(`/post/${id}`).then((res)=>{
            
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });

                console.log(this.state.post);
            }
        });
    }

    render() {

        const {topic,description,postCategory} = this.state.post;

        return (
            <div style = {{marginTop:'20px'}}>

                <h4>{topic}</h4>
                 <hr/>
                 <dl className = "row">
                    <dt className="col-sm-3 text-truncate">Description:</dt>
                    <dd className="col-sm-9">{description}</dd>

                    <dt className="col-sm-3 text-truncate">Post Category:</dt>
                    <dd className="col-sm-9">{postCategory}</dd>
                </dl>
            </div>
        )
    }
}
