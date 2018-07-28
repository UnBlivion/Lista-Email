const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cadastros ={};

app.get("/emails", (req,res) => {
    res.send(cadastros);
});

app.get("/email/:nome", (req,res) => {
    let email = cadastros[req.params.nome];

    if(!email){
        return res.status(404).send({mensagem: `Lamentamos, mas não encontramos o ${req.params.nome}`});
    }

    res.send({"email": email});
});

app.post("/cadastrar", (req, res) => {
    if(!req.body.nome || !req.body.email){
        return res.status(400).send({mensagem: "Erroooo!!"});
    }
    cadastros[req.body.nome] = req.body.email;
    res.send({mensagem : "cadastro realizado com sucesso"});
});

app.listen(3000, () => console.log("Aplicação Inicializado"));