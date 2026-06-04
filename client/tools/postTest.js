const axios = require('axios');

axios.post('http://localhost:5000/posts', {
  title: 'node-test',
  message: 'node test message',
  creator: 'node-tester',
  tags: [],
  selectedFile: ''
})
.then((res) => {
  console.log('Posted:', res.data);
})
.catch((err) => {
  console.error('Error posting:', err.response ? err.response.data : err.message);
});
