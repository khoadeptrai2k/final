import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ACTIONS from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const {auth} = useSelector(state => state);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      const getFilesList = async () => {
        try {
          const { data } = await axios.get('/getAllFiles');
          setErrorMsg('');
          setFilesList(data);
        } catch (error) {
          error.response && setErrorMsg(error.response.data);
        }
      };
  getFilesList();
    }, []);

  const handleDelete = async (id) => {
        try {
            if(filesList._id === id){
                if(window.confirm("Are you sure you want to delete this REPORT?")){
                    await axios.delete(`/deleteFile/${id}`, {
                        headers: {Authorization: auth.token}
                    })

                }
            }

          dispatch({ 
              type: ACTIONS.ALERT, payload: {success:"DELETE SUCCESSFULL"}
          })
          
        } catch (err) {
          setFilesList({...filesList, err: err.response.data.msg , success: ''})
        }
    }
  
const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };
return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="adminListUser">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                  <td>
                      <button className="" title="Remove"
                      onClick={() => handleDelete(filesList._id)} >Delete</button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default FilesList;