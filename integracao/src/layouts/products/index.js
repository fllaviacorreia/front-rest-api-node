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
import MDBadge from "components/MDBadge";
import MDProgress from "components/MDProgress";


export default function Tables() {

  const [products, setProducts] = useState([]);
  const [sections, setSections] = useState([]);
  const [sentinela, setSentinela] = useState(false);

  useEffect(() => {
    if(!sentinela){
      api.get("section").then(response => {
        setSections(response.data.sections);
       });
      api.get('product').then(response => {
        setProducts(response.data.product);
      });      
    }
    if(products.length > 0 && sections.length > 0){
      setSentinela(true);
    }
    
  });


  async function handleDelete(id){
    try{
        await api.delete(`/product/${id}`);
        setProducts(products.filter(product => product.id !== id));
        alert("Produto inativado com sucesso!");
    }catch(err){
        alert("Erro ao inativar produto!");
    }
}

  const GenericInformation = ({ information }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {information}
    </MDTypography>
  );
  const Active = ({ tipo, cor }) => (
    <MDBadge badgeContent={tipo} color={cor} variant="gradient" size="sm" />
  );

  const EditProduct = ({ id }) => (
    <MDTypography component="a" href={`/products/edit/${id}`} >
      <Icon color="info" fontSize="small">editrounded</Icon>
    </MDTypography>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}
      </MDTypography>
      <MDBox ml={1} width="5rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  function dateFormat(data) {
    var formatter = new Date(data).toLocaleDateString('pt-BR');
    return <GenericInformation information={formatter} />
  }

  function getNameSection(id) {
    if(sections.length > 0){
      const section = sections.filter(section => section.id === id);
      return <GenericInformation information={section[0].section_name} />
    }
    return <GenericInformation information={"-"} />
    
  }

  function typeActive(tipo) {
    if (tipo) {
      return <Active tipo="ATIVO" cor="success" />
    } else {
      return <Active tipo="INATIVO" cor="dark" />
    }
  }
  

  function totalEstoque(valor){
    if(valor <= 15){
      return <Progress color="error" value={valor} />
    }
    else if(valor > 15 && valor <= 30){
      return <Progress color="info" value={valor} />
    }
    else{
      return <Progress color="success" value={valor} />
    }
  }
  const { columns, rows } = {
    columns: [
      { Header: "nome", accessor: "name",  align: "left" },
      { Header: "preço", accessor: "price", align: "left" },
      { Header: "descrição", accessor: "description", align: "center" },
      { Header: "informações técnicas", accessor: "technicalinformation", align: "center" },
      { Header: "quantidade", accessor: "quantity", align: "center" },
      { Header: "seção", accessor: "section", align: "center" },
      { Header: "situação", accessor: "situation", align: "center" },
      { Header: "quando cadastrado", accessor: "quandoCadastrado", align: "center" },
      { Header: "ação", accessor: "acao", align: "center" },
    ],

    rows: products.map(product =>
    ({
      name: (
        <GenericInformation information={product.product_name} />
      ),
      price: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
                R$ {product.price}
        </MDTypography>
      ),
      description: (
        <GenericInformation information={product.description} />
      ),
      technicalinformation: (
        <GenericInformation information={product.technical_information} />
      ),
      quantity: (
        totalEstoque(product.quantity)
      ),
      section: (
        getNameSection(product.SectionId)
      ),
      situation: (
        typeActive(product.active)
      ),
      quandoCadastrado: (
        dateFormat(product.createdAt)
      ),
      acao: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <EditProduct id={product.id} />
          </MDBox>
          <MDBox ml={2} lineHeight={1}>
            <MDButton variant="text" color="error" onClick={()=>handleDelete(product.id)}>
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
                  Tabela de produtos
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
