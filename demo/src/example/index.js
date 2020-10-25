import React, { useRef } from 'react';
import styled from 'styled-components';
import EmailEditor from '../../../src';
import Swal from 'sweetalert2';
import $ from 'jquery'

const send_script = 'http://127.0.0.1:4000'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;

const myHeaders = new Headers();

const myInit = { 
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default' 
};

const Example = (props) => {
  const emailEditorRef = useRef(null);

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      Swal.fire({
        title: 'Give this template a name',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: `Save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success');
          $.ajax({
            url: send_script,
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({data: design, title: result.value}),
            success: (data) => {
                console.log(data);
            }
          });
        }
      })
    });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };

  const designLoad = () => {
    const fetchFile = async() => { 
      var myRequest = new Request('http://127.0.0.1:4000', myInit);
      
      let response = await fetch(myRequest, myInit)
      .then((res)=> (res.json()))
      .then((data) => (data));

      return response
    }

    const templates = (async () => {
      let response = await fetchFile();
      let aNames =  new Map(response.files)
      let names = Object.fromEntries(aNames);

      return names
    })();
    
    const getTemplate = async(template) => { 
      
      let myRequest = new Request('http://127.0.0.1:4000/file/' + template, myInit);
      
      let response = await fetch(myRequest, myInit)
      .then((res)=> (res.json()))
      .then((data) => ( data ));

      return response
    }

    Swal.fire({
      title: 'Type a template name to load',
      input: 'select',
      inputOptions: templates,
      showCancelButton: true,
      confirmButtonText: `Import`,
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          let template = await getTemplate(result.value);
          emailEditorRef.current.editor.loadDesign(template);
        })();
      }
    });
  }

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = () => {    
    emailEditorRef.current.editor.addEventListener(
      'onDesignLoad',
      onDesignLoad
    );
    
  };

  return (
    <Container>
      <Bar>
        <h1>React Email Editor (Demo)</h1>

        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={designLoad}>Import Design</button>
      </Bar>

      <React.StrictMode>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      </React.StrictMode>
    </Container>
  );
};

export default Example;
