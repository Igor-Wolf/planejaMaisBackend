import express from "express"
import createApp from "./app"


const app = createApp()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})




//===================== Ao final verificar a versão de distribuição que será postada na vercel