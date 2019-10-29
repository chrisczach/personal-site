import React from 'react';
import BlocksToMUI from './blocks-to-MUI';
import Figure from './figure';

const serializers = {
  types: {
    figure: Figure,
    block: BlocksToMUI,
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

export default serializers;
