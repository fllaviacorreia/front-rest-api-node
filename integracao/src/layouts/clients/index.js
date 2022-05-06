/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useEffect } from "react";
import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

//Buttons
import MDButton from "components/MDButton";

// Data
// import clientsTableData from "layouts/clients/data/clientsTableData";


export default function Tables() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('client').then(response => {
      setClients(response.data);
      console.log("clientes ", clients);
    });
  }, []);

  // async function handleDelete(id) {
  //   try {
  //     await api.delete(`/client/${id}`);
  //     setClients(clients.filter(clients => clients.id !== id));
  //   } catch (err) {
  //     alert("Erro ao deletar!");
  //   }
  // }

  //ou na "escrita" {client.first_name}&nbsp;{client.last_name}
  // const fullName = ({ first, last }) => (
  //   <>
  //     {first}&nbsp;{last}
  //   </>
  // );

  const Columns = () => (
    <TableRow>
      <TableCell>Nome</TableCell>
      <TableCell align="right">Sobrenome</TableCell>
      <TableCell align="right">Data de nascimento</TableCell>
      <TableCell align="right">CPF</TableCell>
      <TableCell align="right">Situação</TableCell>
      <TableCell align="right">Quando cadastrado</TableCell>
      <TableCell align="right">Editar</TableCell>
      <TableCell align="right">Deletar</TableCell>
    </TableRow>
  );

  const Rows = () => (
    clients.map((client) => (
      <TableRow
        key={client.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {client.first_name}
        </TableCell>
        <TableCell component="th" scope="row">
          {client.last_name}
        </TableCell>
        <TableCell align="right">{client.birth_date}</TableCell>
        <TableCell align="right">{client.cpf}</TableCell>
        <TableCell align="right">
          <Active activeClient={client.active} />
        </TableCell>
        <TableCell align="right">
        <MDTypography variant="caption" color="text" fontWeight="medium">
            {client.createdAt}
          </MDTypography>
        </TableCell>
        <TableCell align="right">
          <MDTypography component="a" href={`/clients/edit/${client.id}`} variant="caption" color="text" fontWeight="medium">
            Editar
          </MDTypography>
        </TableCell>
        <TableCell align="right">
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Remover
          </MDTypography>
        </TableCell>
      </TableRow>
    )))

   function Active(props) {
    if (props.activeClient) {
      return (
        <MDBadge badgeContent="ATIVO" color="success" variant="gradient" size="sm" />
      );
    } else {
      return (
        <MDBadge badgeContent="INATIVO" color="error" variant="gradient" size="sm" />
      );
    }
   }

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >

                <MDTypography variant="h6" color="white">
                  Clientes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDButton variant="gradient" color="info" size="large" href="/clients/create">Cadastrar novo cliente</MDButton>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <Columns />
                    </TableHead>
                    <TableBody>
                      <Rows />
                    </TableBody>
                  </Table>
                </TableContainer>


              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
