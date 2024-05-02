const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const url =
  'https://docs.google.com/forms/d/e/1FAIpQLSf07dmJH1MbAroENm2pQPVoN99-FcGEhnToMj3OBgs2R4B_NQ/viewform';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Origin: 'https://docs.google.com',
  Referer:
    'https://docs.google.com/forms/d/e/1FAIpQLSf07dmJH1MbAroENm2pQPVoN99-FcGEhnToMj3OBgs2R4B_NQ/viewform',
};

const rl = readline.createInterface({
  input: fs.createReadStream('data.txt'),
  crlfDelay: Infinity,
});

rl.on('line', async (line) => {
  const data = new URLSearchParams();
  data.append('entry.1908151957', line.trim());

  try {
    await axios.post(url, data, { headers });
    console.log('Data berhasil dikirim ke formulir Google:', line.trim());
  } catch (error) {
    console.error('Gagal mengirim data ke formulir Google:', error);
  }
});
