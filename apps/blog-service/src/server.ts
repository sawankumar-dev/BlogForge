import app from "./app.js";

const port = 4002;
app.listen(port, () => {
    console.log(`Blog service running on port ${port}`)
})