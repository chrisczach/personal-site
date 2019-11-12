import React, { useContext } from 'react';
import { useTransition, animated, config } from 'react-spring';

import { PortraitContext } from './layout';

const TransitionContainer = ({ children }) => {
  const portrait = useContext(PortraitContext);
  const transitions = useTransition(children, item => item.key, {
    from: {
      opacity: 0,
      transform: 'translate3d(0,120px,0)',
      filter: 'saturate(0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0,0px,0)',
      filter: 'saturate(1)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(0,120px,0)',
      filter: 'saturate(0)',
    },
    delay: 200,
    trail: portrait ? 200 : 75,
    config: portrait ? config.gentle : config.default,
  });

  if (portrait) return children;
  return transitions.map(({ item, props, key }) => (
    <animated.div style={props} key={key}>
      {item}
    </animated.div>
  ));
};

export default TransitionContainer;
