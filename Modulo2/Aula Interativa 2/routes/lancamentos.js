import express from "express";
import { inserirLancamento, totalMes } from "../controllers/lancamentosController.js";

const router = express.Router();

router.post("/receita", async (req, res) => {
    try {
        res.send(await inserirLancamento(req.body));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/despesa", async (req, res) => {
    try {
        res.send(await inserirLancamento(req.body, "D"));
    } catch (err) {
        res.status(400).send(err.message);
    }    
});

router.get("/totalMes/:mes", async (req, res) => {
    try {
        res.send(await totalMes(parseInt(req.params.mes)));
    } catch (err) {
        res.status(400).send(err.message);
    }    
});

export default router;



/*router.post("/receita", (req, res) => {
    console.log("1");
    readFile(global.fileName).then(resp => {
        console.log("2");
        const json = JSON.parse(resp);
        const lancamento = { id: json.nextId++, ...req.body };    
        json.lancamentos.push(lancamento);
    
        writeFile(global.fileName, JSON.stringify(json, null, 2)).then(() => {
            res.send(lancamento);
        }).catch(err => {
            res.status(400).send(err.message);
        });                    
    }).catch(err => {
        res.status(400).send(err.message);
    });
    console.log("3");
});*/