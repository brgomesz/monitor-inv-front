import { useState } from "react";
// import { Box } from "@mui/material";
import { TextField, Box, Typography, Button } from "@mui/material";

import "./App.css";

function App() {
  const consoleLog = () => {
    console.log("Funcionou");
  };
  const [dadosCDI, setDadosCDI] = useState([]);
  const [saldoInicial, setSaldoInicial] = useState();
  const [aporteMensal, setAporteMensal] = useState();
  const [mesesAplicacao, setMesesAplicacao] = useState();

  const handleEnviarInfos = async () => {
    const response = await fetch("http://localhost:4000/calcular-cdi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        saldoInicial,
        aporteMensal,
        tempoMeses: mesesAplicacao,
      }),
    });
    let resultado;
    resultado = await response.json();
    setSaldoInicial("");
    setAporteMensal("");
    setMesesAplicacao("");
  

    console.log("Resposta do servidor:", resultado);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#87CEEB", pt: 5 }}>
        <Box
          sx={{
            margin: "auto",
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            height: "90vh",
            width: { xs: "80%", sm: "100%", md: "60%" },
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#ffffff",
            }}
          >
            {/* <h1 style={{textAlign:'center'}}>Calculadora CDI</h1> */}
            <Typography
              sx={{
                fontSize: { xs: "30px", md: "40px" },
                textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Calculadora CDB
            </Typography>

            <TextField
              label="Saldo Inicial"
              type="number"
              variant="outlined"
              value={saldoInicial}
              onChange={(e) => setSaldoInicial(+e.target.value)}
            />
            <TextField
              label="Aporte Mensal"
              type="number"
              variant="outlined"
              value={aporteMensal}
              onChange={(e) => setAporteMensal(+e.target.value)}
            />
            <TextField
              label="Meses de Aplicação"
              type="number"
              variant="outlined"
              value={mesesAplicacao}
              onChange={(e) => setMesesAplicacao(+e.target.value)}
            />
            <Button
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                width: { xs: "50%", md: "30%" },
                margin: "auto",
                mt: 2,
              }}
              onClick={handleEnviarInfos}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
