import React, { useState, useImperativeHandle } from 'react';

const Toggable = React.forwardRef(({children}, ref) => {
  const [visible, setVisible] = useState(false);

  const showIfVisibile = {display: visible ? '' : "none"}

  const toggleVisibility = (forceBoolean) => {
    if (forceBoolean !== undefined) {
      setVisible(forceBoolean);
    } else {
      setVisible(!visible);
    }
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility, visible }
  });

  return(
    <div style={showIfVisibile}>
      {children}
    </div>
  )
})

export default Toggable;