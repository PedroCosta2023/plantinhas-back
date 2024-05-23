// ultilização de api
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const cors = require('cors')

const app = express()

app.use(cors())

//configuração do multer - armazenar arquivos
const storage = multer.memoryStorage()
// Const de Upload
const upload = multer({ storage: storage })

app.use(express.json())

app.get("/upload", async (req, res) => {

})

app.post("/upload", upload.single('image'), async (req, res) => {
    try {
        //salvar img
        const imgName = req.file.originalname;
        const imgData = req.file.buffer;

        //salvar pasta
        await sharp(imgData).toFile(`uploads/${imgName}`)


    } catch (error) {
        console.error("Algo de inesperado ocorreu", error)
        return res.status(500).json({ msg: "Ocorreu um erro" })
    }
})

//fileSystem

const fs = require("fs")

app.get("/uploads", (req, res) => {
    fs.readdir("uploads/", (err, files) => {
        if (err) {
            return res.status(500).json({ msg: "Error ao listar imgs inesperado" })
        }
        const imgs = files.filter((file) => file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".jpg"))

        return res.send(imgs)
    })
})

const path = require("path");

app.get("/uploads/:imgName", (req, res) => {
    const imgName = req.params.imgName
    const imgPath = path.join(__dirname, "uploads", imgName)
    res.sendFile(imgPath)
})




app.listen(3000, () => {
    console.log("Server running")
})