import React,{useState} from 'react'
import profilePic from '../assets/profile.png'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {Link} from 'react-router-dom'
import './card.css'

import axios from 'axios'



function Card({name ,likes,profile, photo , caption , liked , postId , comments,id,stateId}) {

    const [comment,setComment] = useState(comments);
    const [like,setLike] = useState(liked);
    const [count,setCount]  = useState(likes.length);
    const [newcomment,setNewcomment] = useState('');

   

    

    const removeLike = async(id)=>{
           await axios.put('/post/unlike',{
             postId : id
         });
         setCount(count-1);


    }

    const addLike = async(id)=>{
         await axios.put('/post/like',{
            postId : id
        });
        setCount(count+1);

   }

   const handleSubmit = async(e)=>{
       e.preventDefault();
       const commented = await axios.put('/post/comment',{
           text : newcomment,
           postId : postId
       },{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
         }
       })
       if(commented){
           setComment(commented.data.comments)
       }

       
      // setComment(commented.data.comments);
    }

    


    return (
        <div className="container my-3">
            <div className="card" style={{borderRadius:"10px",boxShadow:"3px 3px 2px 0px rgba(0,0,0,0.13)"}} >
                <div className="contanier-fluid d-flex p-2 my-1 align-items-center justify-content-start">
                    <div  className="mx-3"  style={{height:"32px",width:"32px"}}>
                    <img className="img-fluid" src={profile?profile:profilePic} alt="userPhoto" style={{height:"100%",width:"100%",borderRadius:"50%"}}  />
                    </div>
                  
                     <Link to={stateId===id?'/profile':`/profile/${id}`} ><h4 className="text-muted" >{name}</h4></Link> 
                </div>
                <div className="card-img-top" >
                    <img className="" src={photo}
                      alt="postImage" style={{objectFit:"cover",height:"100%",width:"100%"}} />
                </div>
                <div className="card-body">
                     <div className="d-flex justify-content-start align-items-center my-1 p-1">
                         <button  style={{border:"none",outline:"none",background:"white"}}
                         onClick={async (e) => {
                            like ? await removeLike(postId) : await addLike(postId);
                            setLike(!like);
                          }}
                         >{like?<FavoriteIcon style={{color:"red",marginRight:"10px",background:"white"}}/> : <FavoriteBorderIcon style={{color:"black",marginRight:"10px"}}/>}
                         <span className="display-5" >{count}</span>
                         </button>
                      
                       <ChatBubbleOutlineIcon style={{color:"black",marginLeft:"8px"}} />
                       <span className="display-5" >{comments.length}</span>
                     </div>
                     <div>
                         <h6>Liked by {count} others</h6>
                     </div>
                     <div className="card-text">
                         <p><span style={{fontWeight:"bold"}}>{name} </span> {caption} </p>
                     </div>
                     <div>
                       
                       {comment.map((c,index)=>(
                           <div key={index}  className="card-text">
                            <p > {c.postedBy.name} : {c.text} </p>
                            </div>
                       ))}

                     </div>

                     <form onSubmit={handleSubmit} >
                         
                             <div className="d-flex justify-content-between">
                                 <input className="commentInput" required onChange={e=>setNewcomment(e.target.value)} value={newcomment} type="text" style={{border:"none" , height:"30px",width:"80%"}} placeholder="Add a comment..." /> 
                                 <button type="submit" style={{border:"none",color:"blue",backgroundColor:"white"}}>Post</button>
                             </div>
                         
                     </form>
                </div>
            </div>
        </div>
    )
}

export default Card
