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
import { useNavigate, useParams } from "react-router-dom";
import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

function FormProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initProduct = {
    productname: "",
    price: "",
    description: "",
    technicalinformation: "",
    quantity: "",
    sectionid: "",
  };

  const [sections, setSections] = React.useState(null);

  // "id", "section_name", "createdAt", "updatedAt"


  const [product, setProduct] = useState(initProduct);

  const [sectionname, setSectionName] = useState('');

  console.log("product = ", product);  
  console.log("sections = ", sections);
  console.log("sectionname = ", sectionname);

  //get para alteração de usuários
  useEffect(() => {
    if (id) {
      api.get(`/product/${id}`).then((response) => {
        setProduct(...response.data);
      });
    }

    async function getPost() {
      const response = await api.get("/section");
      setSections(response.data);
    }

    getPost();

    // api.get('/section/').then((response) => {
    //   setSections(response.data);
    // }).catch ((error) => {
    //   alert("Erro ao cadastrar seção.", error);
    //   console.log("error = ", error);
    // });
  }, []);

  function getSections(){
    api.get('/section/').then((response) => {
     setSections(response.data);
   }).catch ((error) => {
    alert("Erro ao cadastrar seção.", error);
    console.log("error = ", error);
  });
  }
  function onSubmit(ev) {
    ev.preventDefault(); //pagina não regarrega novamente
    console.log("olá");
    //definindo se é create ou update para o método e url
    const method = id ? "put" : "post";
    const url = id ? `product/${id}` : "/product/";

    api[method](url, product).then((response) => {
      navigate("/products");
    });
  }

  function onCancel(ev) {
    navigate("/products");
  }

  function onChange(ev) {
    const valueT = ev.target.value;
    console.log(valueT);
    if(valueT === "newSection"){
      let item = prompt("Insira uma nova seção", "");
      console.log("item = ",item);
      if (item == null || item === "") {
          alert("Nenhum valor inserido!");
      } else {
        setSectionName(item);
          
            api.post('/section', {sectionname}).then((response) => {
              getSections();
              alert("Nova seção cadastrada.")
            }).catch ((error) => {
              alert("Erro ao cadastrar seção.", error);
              console.log("error = ", error);
            });
         
          
      }
    }
    else{
    const { name, value } = ev.target;
    setProduct({
      ...product,
      [name]: value,
    });
  }
    console.log(product);
  }

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
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
                Cadastrar novo produto
              </MDTypography>
            </MDBox>

            <MDBox m={4}>
              <form onSubmit={onSubmit}>
                <MDBox m={5}>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="light"
                    borderRadius="lg"
                    coloredShadow="secondary"
                  >
                    <MDTypography variant="h6" color="black">
                      Dados
                    </MDTypography>
                  </MDBox>
                  <MDBox m={3}>
                    <MDInput
                      type="text"
                      label="Nome"
                      name="productname"
                      size="large"
                      onChange={onChange}
                      required="true"
                      value={product.productname}
                      sx={{
                        m: 2,
                      }}
                    />

                    <MDInput
                      type="text"
                      label="Preço"
                      name="price"
                      onChange={onChange}
                      required="true"
                      value={product.price}
                      sx={{
                        m: 2,
                      }}
                    />

                    <MDInput
                      type="text"
                      label="Descrição"
                      name="description"
                      onChange={onChange}
                      value={product.description}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />

                    <MDInput
                      type="text"
                      label="Informações técnicas"
                      name="technicalinformation"
                      onChange={onChange}
                      value={product.technicalinformation}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                    <MDInput
                      type="text"
                      label="Quantidade"
                      name="quantity"
                      onChange={onChange}
                      value={product.quantity}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                    <Select
                      label="Seção"
                      name="sectionid"
                      value={product.sectionid}
                      onChange={onChange}
                      displayEmpty
                    >
                      <MenuItem value="">Selecione</MenuItem>                      
                      <MenuItem value="newSection">
                        Adicionar nova seção
                      </MenuItem>
                                          
                      {sections.map((section) => (
                       <MenuItem key={section.id} value={section.section_name}>{section.section_name}</MenuItem>
          ))}
                      

                     
                    </Select>
                    <MDInput
                      type="text"
                      label="Seção"
                      name="sectionid"
                      onChange={onChange}
                      value={product.sectionid}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                  </MDBox>
                </MDBox>
                <MDBox m={5} p={5}>
                  <Button onClick={onSubmit}>Cadastrar</Button>

                  <Button onClick={onCancel}>Cancelar</Button>
                </MDBox>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FormProduct;
