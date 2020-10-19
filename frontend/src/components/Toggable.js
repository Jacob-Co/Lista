const { useState } = require("react");

import React, { useState, useImperativeHandle } from 'react';

const Toggable = React.forwardRef(({children}, ref) => {
  const [visible, setVisible] = useState(false);

  const showIfVisibile = {diplay: visible ? '' : "none"}

  const toggleVisibility = () => {
    setVisible(!visibile);
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