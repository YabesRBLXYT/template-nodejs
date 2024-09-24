const http = require('http');
const { exec } = require('child_process');

// Catat waktu server mulai
const serverStartTime = Date.now();

// Fungsi untuk membuka URL
function openURL() {
    const url = 'https://hacklienquan.fun/hoanthanh.php?token=7b22636861746964223a2237323936313738333339222c226c6f6169223a2272656466696e6765723668222c22746f6b656e6c696e6b223a226234626464383431313562326465393639633333383166353962633735643730227d&__cf_chl_rt_tk=nYdcjqMxAdcE4MRdzsB8cBB9Omls7HHaTswmvQgq8Oc-1727178620-0.0.1.1-5908';
    
    // Menjalankan perintah untuk membuka URL
    exec(`curl ${url}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening URL: ${error.message}`);
        } else {
            console.log(`URL opened successfully: ${stdout}`);
        }
    });
}

// Fungsi untuk menghitung waktu uptime server
function getUptime() {
    const now = Date.now();
    const uptimeMilliseconds = now - serverStartTime;
    const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    const uptimeDays = Math.floor(uptimeHours / 24);
    
    return `${uptimeDays} days, ${uptimeHours % 24} hours, ${uptimeMinutes % 60} minutes, ${uptimeSeconds % 60} seconds`;
}

// Buka URL setiap 10 menit (600000 milidetik)
setInterval(openURL, 600000);

// Membuat server HTTP sederhana untuk memberikan status server dan uptime
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Server Status: Running\n');
    res.write(`Server Uptime: ${getUptime()}\n`);
    res.end();
}).listen(process.env.PORT || 3000);

console.log('Server running...');
