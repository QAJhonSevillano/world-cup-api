const express = require("express");
const app = express();

app.use(express.json());

//const PORT = 3000;
const PORT = process.env.PORT || 3000;

// Línea 9 corregida:
app.get("/worldCup", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "API funcionando correctamente"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});


const db = require("./db/connection");

// ********************************    C R E A R     E Q U I P O S   *****************************************   //
app.post("/worldCup/createTeams", (req, res) => {

    const {
        id,
        teamName,
        continentName,
        rankingFifa,
        worldCupGroup
    } = req.body;

    if (!id) {
        return res.status(400).json({
            message: "El campo id es requerido"
        });
    }

    if (!teamName) {
        return res.status(400).json({
            message: "El campo teamName es requerido"
        });
    }

    if (!continentName) {
        return res.status(400).json({
            message: "El campo continentName es requerido"
        });
    }

    if (!rankingFifa) {
        return res.status(400).json({
            message: "El campo rankingFifa es requerido"
        });
    }

    if (!worldCupGroup) {
        return res.status(400).json({
            message: "El campo worldCupGroup es requerido"
        });
    }






    db.get(
    "SELECT * FROM teams WHERE id = ?",
    [id],
    (error, row) => {

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        if (row) {
            return res.status(409).json({
                message: "El equipo a registrar ya existe"
            });
        }

        const sql = `
        INSERT INTO teams
        (
            id,
            teamName,
            continentName,
            rankingFifa,
            worldCupGroup
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            id,
            teamName,
            continentName,
            rankingFifa,
            worldCupGroup
        ],
        function(error) {

            if (error) {
                return res.status(500).json({
                    message: error.message
                });
            }

            res.status(201).json({
                message: "Equipo creado satisfactoriamente"
            });

        }
    );
    }
);

});

// ******************************    B U S C A R     T O D O S     L O S     E Q U I P O S   *****************************************   //
app.get("/worldCup/allTeams", (req, res) => {

    db.all(
        "SELECT * FROM teams",
        [],
        (error, rows) => {

            if (error) {
                return res.status(500).json({
                    message: error.message
                });
            }

            res.status(200).json(rows);

        }
    );

});

// ******************************    B U S C A R     E Q U I P O S     P O R     I D   *****************************************   //
app.get("/worldCup/teamsById/:id", (req, res) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM teams WHERE id = ?",
        [id],
        (error, row) => {

            if (error) {
                return res.status(500).json({
                    message: error.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Equipo no encontrado"
                });
            }

            res.status(200).json(row);

        }
    );

});