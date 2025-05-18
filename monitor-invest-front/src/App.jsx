import { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./App.css";
import GraficoResultado from "./components/grafico";
import DataTable from "./components/dataTable";

function App() {
  const consoleLog = () => {
    console.log("Funcionou");
  };
  const [dadosCDI, setDadosCDI] = useState([]);
  const [saldoInicial, setSaldoInicial] = useState();
  const [aporteMensal, setAporteMensal] = useState();
  const [mesesAplicacao, setMesesAplicacao] = useState();
  const [resultado, setResultado] = useState([]);

  const reiniciarCalculo = () => {
    setResultado([]);
  };

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

    const resultado = await response.json();
    setResultado(resultado);
    setSaldoInicial("");
    setAporteMensal("");
    setMesesAplicacao("");
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#87CEEB", pt: 5, pb: 5 }}>
        <Box
          sx={{
            margin: "auto",
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            minHeight: { md: "86vh", xs: "80vh" },
            height: "auto",
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
            {!resultado.length && (
              <>
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
              </>
            )}

            {resultado.length > 0 && (
              <>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "50%", md: "30%" }, margin: "auto" }}
                  onClick={reiniciarCalculo}
                >
                  Novo calculo
                </Button>
                <Box>
                  <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
                    Linha do tempo:
                  </Typography>
                  <GraficoResultado resultado={resultado} />
                  <Typography variant="h6">Resultado do CDI:</Typography>

                  {resultado.length > 0 && <DataTable resultado={resultado} />}
                </Box>
                {resultado.length > 0 && <></>}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
