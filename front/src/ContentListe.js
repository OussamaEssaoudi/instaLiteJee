import React, {useState, useEffect} from 'react';
import logo from './logo.png';
import "./ContentListe.css";
import Content from './Content';
import { uploadVideo, fetchFiles } from './Api.js';
import {Link} from 'react-router-dom';

let content3 = require('./vid3.mp4');
let content6 = require('./vid2.mp4');
let video = require('./vid.mp4');

let contents = [
  {
    id : 0,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : 'https://images.pexels.com/photos/3889825/pexels-photo-3889825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type : 'img',
    nbLikes : 372
  },
  {
    id : 1,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : 'https://images.pexels.com/photos/4502960/pexels-photo-4502960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type : 'img',
    nbLikes : 372
  },
  {
    id : 2,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : video,
    type : 'vid',
    nbLikes : 372
  },
  {
    id : 3,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : 'https://images.pexels.com/photos/14998117/pexels-photo-14998117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type : 'img',
    nbLikes : 372
  },
  {
    id : 4,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : 'https://images.pexels.com/photos/3889827/pexels-photo-3889827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type : 'img',
    nbLikes : 372
  },
  {
    id : 5,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : 'https://images.pexels.com/photos/13437324/pexels-photo-13437324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type : 'img',
    nbLikes : 372
  },
  {
    id : 6,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : 'https://images.pexels.com/photos/4502967/pexels-photo-4502967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type : 'img',
    nbLikes : 372
  },
  {
    id : 7,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : content3,
    type : 'vid',
    nbLikes : 372
  },
  {
    id : 8,
    title : 'Marrakech',
    description : 'This is a short example of a description of the content',
    content : content6,
    type : 'vid',
    nbLikes : 372
  }
]

function ContentListe(props) {

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    await uploadVideo(selectedFile);
  };


  
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  
  function handleRefresh (v) {
    setRefresh(v);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFiles();
        setFiles(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">

    {/* <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div> */}
          
            <div class="mt-10">
            {props.admin && (
              <Link to={`/update/new`}>
                 <button type="button" class="text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Upload</button>
              </Link>
        )}</div>
          
        <div class="grid grid-cols-3 liste mt-6 pb-32">
          {files.map((content)=>
            <Content admin={props.admin} id={content.id} content={content.path} type={content.type} likes={content.numLike} title={content.title} desc={content.description} privacy={content.access} refresh={refresh} onRefresh={handleRefresh} />
          )
          }
        </div>
     </div>
  );
}

export default ContentListe;
