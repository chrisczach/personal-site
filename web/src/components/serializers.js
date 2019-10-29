import React from 'react';
import BlocksToMUI from './blocks-to-MUI';
import Figure from './figure';
import Avatar from './avatar-wrapper';

const serializers = {
  types: {
    figure: Figure,
    avatar: Avatar,
    block: BlocksToMUI,
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

export default serializers;
