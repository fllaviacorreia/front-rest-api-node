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

  const [address, setAddress] = useState([]);

  useEffect(() => {
    api.get('address').then(response => {
      setAddress(response.data.addresses);
    });
  });

  async function handleDelete(id){
    try{
        await api.delete(`/address/${id}`);
        setAddress(address.filter(address => address.id !== id));
        alert("Endereço excluido com sucesso!");
    }catch(err){
        alert("Erro ao excluir endereço!");
    }
}

  const GenericInformation = ({ information }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {information}
    </MDTypography>
  );

  const EditAddress = ({ id }) => (
    <MDTypography component="a" href={`/address/edit/${id}`} >
      <Icon color="info" fontSize="small">editrounded</Icon>
    </MDTypography>
  )

  function dateFormat(data) {
    var formatter = new Date(data).toLocaleDateString('pt-BR');
    return <GenericInformation information={formatter} />
  }

  const { columns, rows } = {
    columns: [
      { Header: "rua", accessor: "street",  align: "left" },
      { Header: "bairro", accessor: "district", align: "left" },
      { Header: "número", accessor: "number", align: "center" },
      { Header: "cidade", accessor: "city", align: "center" },
      { Header: "estado", accessor: "state", align: "center" },
      { Header: "país", accessor: "country", align: "center" },
      { Header: "código postal", accessor: "zipcode", align: "center" },
      { Header: "quando cadastrado", accessor: "quandoCadastrado", align: "center" },
      { Header: "ação", accessor: "acao", align: "center" },
    ],

    rows: address.map(address =>
    ({
      street: (
        <GenericInformation information={address.street} />
      ),
      district: (
        <GenericInformation information={address.district} />
      ),
      number: (
        <GenericInformation information={address.number} />
      ),
      city: (
        <GenericInformation information={address.city} />
      ),
      state: (
        <GenericInformation information={address.state} />
      ),
      country: (
        <GenericInformation information={address.country} />
      ),
      zipcode: (
        <GenericInformation information={address.zipcode} />
      ),
      quandoCadastrado: (
        dateFormat(address.createdAt)
      ),
      acao: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <EditAddress id={address.id} />
          </MDBox>
          <MDBox ml={2} lineHeight={1}>
            <MDButton variant="text" color="error" onClick={()=>handleDelete(address.id)}>
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
                  Tabela de endereços
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
