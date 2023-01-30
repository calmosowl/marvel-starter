function truncateString(string, num) {
  if (string.length > num) {
    return (string.slice(0, num) + '...');
  }

  return string;
}

export default truncateString;