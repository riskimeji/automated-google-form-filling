const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const url =
  'https://docs.google.com/forms/d/e/1FAIpQLSf91Cevtd_heNf7IItyGYxy_rM65Ulm6yjn43R6GQkH1ku-yA/formResponse'; // URL form response

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Origin: 'https://docs.google.com',
  Referer: url,
  // 'User-Agent': 'Your User Agent', // Jika perlu sesuaikan dengan user agent Anda
};

const rl = readline.createInterface({
  input: fs.createReadStream('data.txt'), // Baca file data.txt
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  const data = {};
  const values = line.split('|'); // Pisahkan data berdasarkan '|'
  data['entry.2005620554'] = values[0]; // Nama Anda
  data['entry.1045781291'] = values[1]; // Email
  data['entry.1065046570'] = values[2]; // Alamat
  data['entry.1166974658'] = values[3]; // Nomor Telepon
  data['entry.839337160'] = values[4]; // Komentar

  // Kirim permintaan POST ke formulir dengan header
  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log('Data berhasil dikirim ke formulir Google.');
    })
    .catch((error) => {
      console.error('Gagal mengirim data ke formulir Google:', error);
    });
});
