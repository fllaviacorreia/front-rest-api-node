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
import { useState, useEffect } from "react";
import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Icon } from "@mui/material";


export default function Tables() {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('client').then(response => {
      setClients(response.data.clients);
    });
  });

  async function handleDelete(id){
    try{
        await api.delete(`/client/${id}`);
        setClients(clients.filter(client => client.id !== id));
        alert("Cliente inativado com sucesso!");
    }catch(err){
        alert("Erro ao inativar cliente!");
    }
}

  const FullName = ({ firstName, secondName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {firstName} {secondName}
        </MDTypography>
      </MDBox>
    </MDBox>
  );


  const Active = ({ tipo, cor }) => (
    <MDBadge badgeContent={tipo} color={cor} variant="gradient" size="sm" />
  );

  const GenericInformation = ({ information }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {information}
    </MDTypography>
  );

  const EditClient = ({ id }) => (
    <MDTypography component="a" href={`/clients/edit/${id}`} >
      <Icon color="info" fontSize="small">editrounded</Icon>
    </MDTypography>
  )

  function dateFormat(data) {
    var formatter = new Date(data).toLocaleDateString('pt-BR');
    return <GenericInformation information={formatter} />
  }

  function typeActive(tipo) {
    if (tipo) {
      return <Active tipo="ATIVO" cor="success" />
    } else {
      return <Active tipo="INATIVO" cor="dark" />
    }
  }

  const { columns, rows } = {
    columns: [
      { Header: "nome", accessor: "nome", width: "30%", align: "left" },
      { Header: "data de nascimento", accessor: "dataNascimento", align: "left" },
      { Header: "cpf", accessor: "cpf", align: "center" },
      { Header: "situação", accessor: "situacao", align: "center" },
      { Header: "quando cadastrado", accessor: "quandoCadastrado", align: "center" },
      { Header: "ação", accessor: "acao", align: "center" },
    ],

    rows: clients.map(client =>
    ({
      nome: (
        <FullName firstName={client.first_name} secondName={client.last_name} />
      ),
      dataNascimento: (
        dateFormat(client.birth_date)
      ),
      cpf: (
        <GenericInformation information={client.cpf} />
      ),
      situacao: (
        typeActive(client.active)
      ),
      quandoCadastrado: (
        dateFormat(client.createdAt)
      ),
      acao: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <EditClient id={client.id} />
          </MDBox>
          <MDBox ml={2} lineHeight={1}>
            <MDButton variant="text" color="error" onClick={()=>handleDelete(client.id)}>
              <Icon>deleterounded</Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      )
    })),
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  Tabela de clientes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
