import app from './app.js'


const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`\nRunning on Port ${PORT}: http://localhost:${PORT}`);
});