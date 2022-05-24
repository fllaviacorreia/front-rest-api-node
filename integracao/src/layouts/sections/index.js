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
  const [sections, setSections] = useState([]);

  useEffect(() => {
    api.get('section').then(response => {
      setSections(response.data.sections);
    });

  });

  async function handleDelete(id) {
    try {
      await api.delete(`/section/${id}`);
      setSections(sections.filter(section => section.id !== id));
      alert("Seção excluída com sucesso!");
    } catch (err) {
      alert("Erro ao excluir seção!");
    }
  }

  const SectionName = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );


  const GenericInformation = ({ information }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {information}
    </MDTypography>
  );


  function editSection(id) {
    const sectionname = prompt("Insira o nome da seção", "");
    if (sectionname == null || sectionname === "") {
      alert("Nenhum valor inserido!");
    } else {
      saveSection(id, sectionname.toUpperCase());
    }
  }

  async function saveSection(id, name) {
    try {
      await api.patch('/section', { id: id, sectionname: name }).then((response) => {
        alert("Seção alterada.")
      });
    } catch (err) {
      alert("Erro ao alterar seção.");
    }
  }
  function dateFormat(data) {
    var formatter = new Date(data).toLocaleDateString('pt-BR');
    return <GenericInformation information={formatter} />
  }


  const { columns, rows } = {
    columns: [
      { Header: "nome", accessor: "nome", width: "40%", align: "left" },
      { Header: "quando cadastrado", accessor: "quandoCadastrado", align: "center" },
      { Header: "ação", accessor: "acao", align: "center" },
    ],

    rows: sections.map(section =>
    ({
      nome: (
        <SectionName name={section.section_name} />
      ),

      quandoCadastrado: (
        dateFormat(section.createdAt)
      ),
      acao: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <MDButton variant="text" color="info" onClick={() => editSection(section.id)}>
              <Icon>editrounded</Icon>
            </MDButton>
          </MDBox>
          <MDBox ml={2} lineHeight={1}>
            <MDButton variant="text" color="error" onClick={() => handleDelete(section.id)}>
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
                  Tabela de seções
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
