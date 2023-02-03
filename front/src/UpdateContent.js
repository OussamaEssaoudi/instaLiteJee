import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import "./UpdateContent.css";
import Content from './Content';
import ContentListe from './ContentListe';
import Navbar from './Navbar';
import { postFile, getFile, updateFile } from './Api.js';
import { Toaster } from 'react-hot-toast';


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

function UpdateContent() {

  const { id } = useParams();

  const [selectedtitle, setTitle] = useState(null);
  const [selecteddesc, setDesc] = useState(null);
  const [selectedtype, setType] = useState(null);
  const [selectedprivacy, setPrivacy] = useState('Public');
  const [selectedfile, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    setType(event.target.files[0].type);
  };

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value);
  };
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const postContent = async () => {
    try {
      const file = {
          title:selectedtitle,
          description: selecteddesc,
          file: selectedfile,
          access: selectedprivacy
      }
      console.log(file);
      if (id !== 'new'){
      await updateFile(file,id)
      }
      else{
      await postFile(file)
      }
      window.location.replace('/content');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchFile = async (id) => {
      try {
        const data = await getFile(id);
        setTitle(data.title)
        setPrivacy(data.access)
        setDesc(data.description)
        setFile(data.path)
        setType(data.type)
        setPreview(null)
      } catch (err) {
        console.log(err);
      }
    };
    if(id !== 'new'){
    fetchFile(id);
    }
  }, []);

  return (
    <div>
      <div><Toaster/></div>
    <div className="justify-center mt-10 page">
      <Navbar/>

      <div className='flex bg-pink-100 mt-16 mx-32 contentArea'>
      {(id !== 'new') && (
              selectedtype === "video/mp4" ? (
                
                <ReactPlayer
                url={selectedfile}
                width='500px'
                height='500px'
                className='reactPlayer'
                loop = {true}
                playing = {true}
                volume = {0}
              />
              ):
              (
                  <img src={preview ? preview : selectedfile} alt='' className='pictureUpdate rounded-t-lg'/>
              )
        )}
            <div className='bg-white my-10 mx-auto px-32 pt-10'>
                <form>
                  <div >
                    <div className='mr-10 w-full flex flex-col'>
                          <div className="mb-6 flex">
                              <div>
                                <label className="w-64 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Privacy</label>
                                <select id="privacy"
                                    onChange={handlePrivacyChange}
                                    value={selectedprivacy} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                  <option value="Public">Public</option>
                                  <option value="Private">Private</option>
                                  <option value="Hidden">Hidden</option>
                                </select>
                              </div>
                              
                              <div className='ml-auto'>
                                <label className="w-64 block mb-2 text-sm font-medium text-gray-900 dark:text-white">File</label>
                                <label className="flex flex-row items-center px-4 py-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light cursor-pointer hover:text-pink-300">
                                    <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span className="ml-2 text-sm ">{(!selectedfile || id !== 'new') ? 'Select a file' : selectedfile.name}</span>
                                    <input name='file' type='file' className="hidden" 
                                    onChange={handleFileChange}/>
                                </label>
                              </div>
                          </div>
                          <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="title" value={selectedtitle}
                                    onChange={handleTitleChange} id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                          </div>
                          <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" value={selecteddesc}
                                    onChange={handleDescChange} rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                          </div>
                    </div>

                  </div>

                  <button type="button" onClick={postContent} className="mb-6 text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{id === 'new' ? 'Create' : 'Update'}</button>  
                </form>
            </div>
      </div>
      
    </div>
    </div>
  );
}

export default UpdateContent;
