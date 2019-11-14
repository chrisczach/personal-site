import React, { useContext } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

import ButtonLinks from './button-links';
import BlocksToMUI from './blocks-to-MUI';
import Figure from './figure';
import Avatar from './avatar-wrapper';
import { PortraitContext } from './layout';
import BlockContent from './block-content';
import InternalLink from './internal-link';
import TransitionContainer from './transition-container';

const serializers = {
  types: {
    figure: Figure,
    avatar: Avatar,
    block: BlocksToMUI,
    buttonLinks: ButtonLinks,
    myCode: props => (
      <SyntaxHighlighter
        language={props.node.language}
        style={xonokai}
        showLineNumbers>
        {props.node.code}
      </SyntaxHighlighter>
    ),
    portraitSnippet: ({ node: { portrait, landscape } }) => {
      const isPortrait = useContext(PortraitContext);
      return <BlockContent blocks={isPortrait ? portrait : landscape} />;
    },
    // myCode: props => (
    //   <pre data-language={props.node.language}>
    //     <code>{props.node.code}</code>
    //   </pre>
    // ),
  },
  marks: {
    internalLink: InternalLink,
  },
  container: TransitionContainer,
};
export default serializers;
