import React, { useRef } from 'react';
import styled from 'styled-components';
import base64 from 'base-64';
import EmailEditor from '../../../src';
import sample from './sample.json';
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

const Example = (props) => {
  const emailEditorRef = useRef(null);
//  const replacerFunc = () => {
//     const visited = new WeakSet();
//     return (key, value) => {
//       if (typeof value === "object" && value !== null) {
//         if (visited.has(value)) {
//           return;
//         }
//         visited.add(value);
//       }
//       return value;
//     };
//   };
  
  

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      

      // design.myself = { data: base64.encode(design) }
      // var datas = JSON.stringify(design, replacerFunc());

      $.ajax({
        url: send_script,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({data: design}),
        success: (data) => {
            console.log(data);
        }
      });
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
    //console.log('onDesignLoad', data);
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
