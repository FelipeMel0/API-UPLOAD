const express = require('express')
const fs = require('fs')
const Livro = require('./models/Livro')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true, limit: '5MB'}))

app.post('/testeUpload', (req, res) => {

    let buffer = new Buffer.from(req.body.file, 'base64')
    let imageName = './uploads/' + Date.now().toString() + '.jpg'

    let titulo = req.body.titulo

    // console.log(buffer)

    fs.writeFileSync(imageName, buffer, 'base64', (error)=>{

        if(error) console.log(error)

    })

    const livro = Livro.create({
        titulo: titulo,
        imagem: imageName
    }).then(() => {
        res.status(200).send(livro)
    })

    // res.status(200).send()

})

app.listen(3000, ()=>{
    console.log('Servidor rodando em http://localhohost:3000')
})