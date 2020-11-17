const SSEListener = (SSE) => {
  SSE.onmessage = (e) => {
    console.log(e.data);
  }
}

export default SSEListener;