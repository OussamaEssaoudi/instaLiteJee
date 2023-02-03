import React, {useState, useEffect} from 'react';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import "./Content.css";
import ReactPlayer from 'react-player';
import { deleteFile, likeFile, dislikeFile } from './Api.js';
import { Toaster } from 'react-hot-toast';

function Content(props) {

  const [like, setLike] = useState(false);
  const [refresh, setRefresh] = useState(props.refresh);

  const deleteContent = async (id) => {
    try {
     await deleteFile(id);
     props.onRefresh(!refresh);
     setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  const likeContent = async (id) => {
    try {
      if(!like){
      await likeFile(id);
      }else{
        await dislikeFile(id);
      }
      setLike(!like)
      props.onRefresh(!refresh);
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  // const delete = (id) => {
  //   console.log(id)
  //   deleteFile(props.id)
  // }
  // useEffect(() => {
      
  //   }, [refresh]);


  return (
    <div>
      <div><Toaster/></div>
    <div className="content flex flex-col">
      {props.admin && (<div className="ml-auto" onClick={()=>{deleteContent(props.id)}}>
        <div className="mr-2 cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium delete text-sm px-2 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          <img src="https://img.icons8.com/ios-glyphs/16/ffffff/delete-sign.png"/>
          </div>
      </div>)}
      
          

            
          <div className="max-w-sm bg-white relative rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              
              {
              props.type === "video/mp4" ? (
                
                <Link to={`/update/${props.id}`}>
                    <ReactPlayer
                    url={props.content}
                    width='300px'
                    height='300px'
                    className='reactPlayer'
                    loop = {true}
                    playing = {true}
                    volume = {0}
                  />
                </Link>
              ):
              (
                <Link to={`/update/${props.id}`}>
                  <img src={props.content} className='picture rounded-t-lg'/>
                </Link>
              )
            }
              <div className="p-5">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">{props.title}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.desc}</p>
                  <div className="flex items-center justify-between mt-5 mb-2">
                    <div className="flex gap-3">
                      {/* <div> */}
                        <svg onClick={()=>{likeContent(props.id);}} xmlns="http://www.w3.org/2000/svg" height='24' width='24' className={` cursor-pointer ${like ? ('fill-current text-red-400'):('')} `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      {/* </div> */}
                      <div className="font-semibold text-sm ">{props.likes} likes</div>
                    </div>
                    <div className="flex gap-3">
                        {props.admin && (<Link to={`/update/${props.id}`}><img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/f687b3/external-edit-social-media-ui-tanah-basah-basic-outline-tanah-basah.png"/></Link>)}
                    </div>
                  </div>
              </div>
          </div>

    </div></div>
  );
}

export default Content;
