import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ACTIONS } from '../redux/actions/index';

const ReportAdmin = (files) => {
    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    const [state, setState] = useState({
      title: '',
      description: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch()
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area
    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
        };

        const updateBorder = (dragState) => {
            if (dragState === 'over') {
              dropRef.current.style.border = '2px solid #000';
            } else if (dragState === 'leave') {
              dropRef.current.style.border = '2px dashed #e9ebeb';
            }
          };
        const onDrop = (files) => {
            const [uploadedFile] = files;
            setFile(uploadedFile);
          const fileReader = new FileReader();
            fileReader.onload = () => {
              setPreviewSrc(fileReader.result);
            };
            fileReader.readAsDataURL(uploadedFile);
            setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
            dropRef.current.style.border = '2px dashed #e9ebeb'  
        };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const { title, description } = state;
            if (title.trim() !== '' && description.trim() !== '') {
              if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('title', title);
                formData.append('description', description);
          setErrorMsg('');
                await axios.post('http://localhost:4000/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
              } else {
                setErrorMsg('Please select a file to add.');
              }
            } else {
              setErrorMsg('Please enter all the field values.');
            }
            dispatch({ 
              type: ACTIONS.ALERT, payload: {success:"SUCCESSFULL"}
            })
          } catch (error) {
            error.response && setErrorMsg(error.response.data);
          }
        };

        




  return (
    <div style={{margin:'10px'}}>
        <h1>REPORT WITH ADMIN - YOUR PROBLEMS:</h1>

      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p style={{color:'red'}} className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <h5>Input Your Title...</h5>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 style={{marginTop:'10px'}}>Input Your Description...</h5>
            <Form.Group  controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <h5 style={{marginTop:'10px'}}>Drop Item or Click chose File</h5>
        <div className="upload-section" style={{border:'2px solid black', marginTop:'10px'}}>
            <Dropzone onDrop={onDrop}   
                    onDragEnter={() => updateBorder('over')}
                    onDragLeave={() => updateBorder('leave')}
                    >
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {file && (
                    <div>
                        <strong>Selected file:</strong> {file.name}
                    </div>
                    )}
                </div>
                )}
            </Dropzone>
            {previewSrc ? (
                isPreviewAvailable ? (
                <div className="image-preview">
                    <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
                ) : (
                <div className="preview-message">
                    <p>No preview available for this file</p>
                </div>
                )
            ) : (
                <div className="preview-message">
                <p>Image preview will be shown here after selection</p>
                </div>
            )}
        </div>
        <Button style={{marginTop:'10px'}} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ReportAdmin