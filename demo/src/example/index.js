import React, { useRef } from 'react';
import styled from 'styled-components';

import EmailEditor from '../../../src';
import sample from './sample.json';
import $ from 'jquery'
const send_script = 'https://localhost/_save.php'

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

const Example = (props) => {
  const emailEditorRef = useRef(null);

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      var datas = {}
      datas.desgin = design;

      $.ajax({
          url: send_script,
          type: 'POST',
          dataType: 'json',
          data: datas,
          success: function success(response) {
            console.log(response)
              if (response['type'] == 'success') {
                  // show error message
                  alert("Nice!", "Email has been sent to: " + inputValue, "success");
              } else {
                  alert("Oops!", "An error is occurred", "error");
              }
          },
          error: function error(xhr, err) {
              // Log errors if AJAX call is failed
              console.log(xhr);
              console.log(err);
          }
      });

      console.log('saveDesign', datas);
   
    });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = () => {
    emailEditorRef.current.editor.addEventListener(
      'onDesignLoad',
      onDesignLoad
    );
    emailEditorRef.current.editor.loadDesign(sample);
  };

  return (
    <Container>
      <Bar>
        <h1>React Email Editor (Demo)</h1>

        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={onLoad}>Import Design</button>
      </Bar>

      <React.StrictMode>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      </React.StrictMode>
    </Container>
  );
};

export default Example;
