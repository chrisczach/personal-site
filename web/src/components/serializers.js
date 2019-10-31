import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

import BlocksToMUI from './blocks-to-MUI';
import Figure from './figure';
import Avatar from './avatar-wrapper';

const serializers = {
  types: {
    figure: Figure,
    avatar: Avatar,
    block: BlocksToMUI,
    myCode: props => (
      <SyntaxHighlighter language={props.node.language} style={xonokai}>
        {props.node.code}
      </SyntaxHighlighter>
    ),
    // myCode: props => (
    //   <pre data-language={props.node.language}>
    //     <code>{props.node.code}</code>
    //   </pre>
    // ),
  },
};

export default serializers;
