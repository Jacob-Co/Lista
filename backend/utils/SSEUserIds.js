const SSEUserIds = {}

const reinitializeDisplay = (username) => {
  if (SSEUserIds[username]) {
    const sentToRes = SSEUserIds[username];
    sentToRes.write(`data: re-initialize\n\n`);
    sentToRes.flush();
  }
}

const getUserIds = () => {
  return SSEUserIds;
}

module.exports = { reinitializeDisplay, getUserIds };