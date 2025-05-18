import { Tooltip } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

function GraficoResultado({ resultado }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={resultado}  margin={{left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="saldo" stroke="#1976d2" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraficoResultado;
