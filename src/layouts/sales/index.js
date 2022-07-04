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



// Data

import DataTable from "examples/Tables/DataTable";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Icon } from "@mui/material";



export default function Tables() {

  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get('sale').then(response => {
      setSales(response.data.sales);
    });

  });

  const GenericInformation = ({ information }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {information}
    </MDTypography>
  );

  const EditSale = ({ id }) => (
    <MDTypography component="a" href={`/sales/edit/ ${id}`} >
      <Icon color="info" fontSize="small">editrounded</Icon>
    </MDTypography >
  );

  function dateFormat(data) {
    var formatter = new Date(data).toLocaleDateString('pt-BR');
    return <GenericInformation information={formatter} />
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


  const { columns, rows } = {

    columns: [

      { Header: "cliente", accessor: "client", align: "left" },
      { Header: "colaborador", accessor: "employee", align: "left" },
      { Header: "total compra", accessor: "totalValue", align: "left" },
      { Header: "forma de pagamento", accessor: "paymentmethod", align: "center" },
      { Header: "prestações", accessor: "installment", align: "center" },
      { Header: "latitude", accessor: "latitude", align: "center" },
      { Header: "longitude", accessor: "longitude", align: "center" },
      { Header: "data da compra", accessor: "quandoCadastrado", align: "center" },
      { Header: "ação", accessor: "acao", align: "center" },

    ],

    rows: sales.map(sale =>
    ({
      client: (
        <FullName firstName={sale.Client.first_name} secondName={sale.Client.last_name} />
      ),
      employee: (       
        <FullName firstName={sale.employee.first_name} secondName={sale.employee.last_name} />
      ),
      totalValue: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          R$ {sale.total_value}
        </MDTypography>
      ),
      paymentmethod: (
        <GenericInformation information={sale.payment_method} />
      ),

      installment: (
        <GenericInformation information={sale.installment} />
      ),
      latitude: (
        <GenericInformation information={sale.latitude} />
      ),
      longitude: (
        <GenericInformation information={sale.longitude} />
      ),
      quandoCadastrado: (
        dateFormat(sale.createdAt)
      ),
      acao: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <EditSale id={sale.id} />
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
                  Tabela de vendas
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