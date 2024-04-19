const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
};

const getTimeStamp = (id) => {
  if (!id) return '';
  const timestamp = ('' + id).toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  return date.toLocaleString();
};

export { formatDate, getTimeStamp };
