import React, { useState, useImperativeHandle } from 'react';

const Toggable = React.forwardRef(({children}, ref) => {
  const [visible, setVisible] = useState(false);

  const showIfVisibile = {display: visible ? '' : "none"}

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  });

  return(
    <div style={showIfVisibile}>
      {children}
    </div>
  )
})

export default Toggable;