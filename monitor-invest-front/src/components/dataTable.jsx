import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const colunas = [
  { field: "mes", headerName: "Mês", width: 100 },
  { field: "saldo", headerName: "Saldo (R$)", width: 150 },
];

const DataTable = ({ resultado }) => (
  <Box sx={{ height: 'auto', width: "100%", mt: 3 }}>
    <DataGrid
      rows={resultado.map((item, index) => ({ id: index, ...item }))}
      columns={colunas}
      pageSize={5}
    />
  </Box>
);

export default DataTable;