import axios from 'axios';
import toast from 'react-hot-toast';


export const uploadVideo = async (video) => {
  try {
   

    // console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const URL = 'http://localhost:8090';


  // export function fetchShops() {
  //     try {
  //       // const token = localStorage.getItem('token');
  //       const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
  //       const headers = {
  //         Authorization: `Bearer ${token}`,
  //       };
  //       const response = await axios.get(`${URL}/api/store/`, { headers });
  //       dispatch(getStoresSuccess(response.data));
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         // Si le jeton d'authentification n'est pas valide ou s'il n'est pas présent,
  //         // déconnectez l'utilisateur et affichez un message d'erreur
  //         dispatch(logout());
  //         dispatch(getStoresError('Vous devez vous connecter pour accéder à cette page'));
  //       } else {
  //         dispatch(getStoresError(error.message));
  //       }
  //     }
  // }

  export const fetchFiles = async () => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const result = await axios.get(`${URL}/api/portfolio/files`, { headers });
      return result.data;
    } catch (err) {
      throw(err);
    }
  };

  export const getFile = async (id) => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const result = await axios.get(`${URL}/api/portfolio/file/${id}`, { headers });
      return result.data;
    } catch (err) {
      throw(err);
    }
  };

  export const deleteFile = async (id) => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const result = await axios.delete(`${URL}/api/portfolio/delete/file/${id}`, { headers });
			toast.success("Content deleted")
      return result.data;
    } catch (err) {
      throw(err);
    }
  };


  export const updateFile = async (file,id) => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("title", file.title);
      formData.append("description", file.description);
      formData.append("access", file.access);
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };
      
      const result = await axios.patch(`${URL}/api/portfolio/update/file/${id}`, formData, { headers });
			toast.success("Content Updated")
      return result.data;
    } catch (err) {
			toast.error(err)
      throw(err);
    }
  };

  export const postFile = async (file) => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("title", file.title);
      formData.append("description", file.description);
      formData.append("access", file.access);
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };
      
      const result = await axios.post(`${URL}/api/portfolio/upload`, formData, { headers });
			toast.success("Content Created")
      return result.data;
    } catch (err) {
			toast.error(err)
      throw(err);
    }
  };

  export const likeFile = async (fileid) => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const userid = 1;
      const result = await axios.post(`${URL}/api/like?userId=${userid}&fileId=${fileid}`, { headers });
			toast.success("Content Created")
      return result.data;
    } catch (err) {
			toast.error(err)
      throw(err);
    }
  };

  export const dislikeFile = async (fileid) => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3NTQyNDcxNSwiZXhwIjoxNjc1NTExMTE1fQ.fR1XxYepOjUsinBl_jzp88zu_QkZBsKeySsKx92OpbCBFIBzK83bgo9RTiQLjRUmDNVslC8hycOZTndtONhXrw'
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const userid = 1;
      const result = await axios.post(`${URL}/api/dislike?userId=${userid}&fileId=${fileid}`, { headers });
			toast.success("Content Created")
      return result.data;
    } catch (err) {
			toast.error(err)
      throw(err);
    }
  };

  export const getNews = async () => {
    try {
      
      const headers = {
        'x-api-key': 'BnzsT3Ll4jjfMnMerFHTXxm27rXPnTzPv0xn7rcqobU',
      };
      const result = await axios.get(`https://api.newscatcherapi.com/v2/search?q=IT&lang=fr&page_size=4`, {headers});
      return result.data;
    } catch (err) {
      throw(err);
    }
  };

