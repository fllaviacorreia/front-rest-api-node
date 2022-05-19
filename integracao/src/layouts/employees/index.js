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

  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    api.get('employee').then(response => {
      setEmployees(response.data.employees);
    });
  });

  async function handleDelete(id) {
    try {
      await api.delete(`/employee/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
      alert("Colaborador inativado com sucesso!");
    } catch (err) {
      alert("Erro ao inativar colaborador!");
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

  const EditEmployee = ({ id }) => (
    <MDTypography component="a" href={`/employees/edit/${id}`} >
      <Icon color="info" fontSize="small">editrounded</Icon>
    </MDTypography>
  )

  function dateFormat(data) {
    var formatter = new Date(data).toLocaleDateString('pt-BR');
    return <GenericInformation information={formatter} />
  }

  function getNameDepartment(id) {
  
    api.get(`department/${id}`).then(response => {
     setDepartment(response.data.department.department_name);
    });
    return <GenericInformation information={department} />
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
      { Header: "nome", accessor: "nome", width: "40%", align: "left" },
      { Header: "departamento", accessor: "departamento", align: "left" },
      { Header: "situação", accessor: "situacao", align: "center" },
      { Header: "quando cadastrado", accessor: "quandoCadastrado", align: "center" },
      { Header: "ação", accessor: "acao", align: "center" },
    ],

    rows: employees.map(employee =>
    ({
      nome: (
        <FullName firstName={employee.first_name} secondName={employee.last_name} />
      ),

      departamento: (
        getNameDepartment(employee.departmentId)
      ),
      situacao: (
        typeActive(employee.active)
      ),
      quandoCadastrado: (
        dateFormat(employee.createdAt)
      ),
      acao: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <EditEmployee id={employee.id} />
          </MDBox>
          <MDBox ml={2} lineHeight={1}>
            <MDButton variant="text" color="error" onClick={() => handleDelete(employee.id)}>
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
                  Tabela de colaboradores
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
