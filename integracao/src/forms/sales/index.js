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
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import api from "services/api";

// import Sacola from "producsSelected";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { MenuItem, Select } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";

import Sacola from "forms/sales/sacola";

function FormSale() {
  const navigate = useNavigate();

  const initSale = {
    paymentmethod: "",
    installment: 1,
    totalvalue: 0,
    clientid: 0,
    employeeid: 0,
    products: [],
    latitude: 0,
    longitude: 0,
  };

  const [sale, setSale] = useState(initSale);
  
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
        setSale({ ...sale, "latitude": position.coords.latitude })          
        setSale({ ...sale, "longitude": position.coords.longitude })
    });

    // if (!sentinela) {     
      api.get("client").then((response) => {
        setClients(response.data.clients);
      });
      api.get("employee").then((response) => {
        setEmployees(response.data.employees);
      });
    //   if (clients.length > 0 && employees.length > 0 )  {
    //     setSentinela(true);
    //   }
    // }    
    
      
  }, )


  function onSubmit(ev) {
    ev.preventDefault();
    api.post("/sale", sale).then((response) => {
      alert("Venda cadastrada com sucesso!");
      navigate("/sales");
    });
  }


  //pode-se adicionar um verificador para confirmar saída.
  function onCancel(ev) {
    navigate("/sales");
  }



  function onChange(ev) {
    const { name, value } = ev.target;
    setSale({ ...sale, [name]: value, });
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
                  Cadastrar nova compra
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
                        Dados da compra
                      </MDTypography>
                    </MDBox>

                    <MDBox m={3}>
                      <MDBox m={3} >
                        <FormControl sx={{ p: 1, minWidth: 100 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Cliente</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            label="Cliente"
                            name="clientid"
                            value={sale.clientid}
                            onChange={onChange}
                          >
                            <MenuItem value={0}>Selecione</MenuItem>

                            {
                              clients.map(
                                (client) => (
                                  <MenuItem value={client.id}>
                                    {client.first_name} {client.last_name} - {client.cpf}
                                  </MenuItem>))
                            }
                          </Select>
                        </FormControl>

                        <FormControl sx={{ p: 1, minWidth: 100 }}>
                          <InputLabel id="demo-simple-select-autowidth-label" >Colaborador</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            label="Colaborador"
                            name="employeeid"
                            value={sale.employeeid}
                            onChange={onChange}
                          >
                            <MenuItem value={0}>Selecione</MenuItem>

                            {
                              employees.map(
                                (employee) => (
                                  <MenuItem value={employee.id}>
                                    {employee.first_name} &nbsp;{employee.lastt_name}
                                  </MenuItem>))
                            }
                          </Select>

                        </FormControl>

                        <FormControl sx={{ p: 1, minWidth: 200 }}>
                          <InputLabel id="demo-simple-select-autowidth-label" >Forma de pagamento</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            label="Forma de pagamento"
                            name="paymentmethod"
                            value={sale.paymentmethod}
                            onChange={onChange}
                          >
                            <MenuItem value={""}>Selecione</MenuItem>
                            <MenuItem value={"Dinheiro em espécie"}>Dinheiro em espécie</MenuItem>
                            <MenuItem value={"Cartão de crédito"}>Cartão de crédito</MenuItem>
                            <MenuItem value={"Cartão de débito"}>Cartão de débito</MenuItem>
                            <MenuItem value={"PIX"}>PIX</MenuItem>
                            <MenuItem value={"TICKEt"}>Ticket</MenuItem>

                          </Select>

                        </FormControl>

                      </MDBox>
                      <MDBox m={3}>
                        <MDInput
                          type="number"
                          label="Número de prestações"
                          name="installment"
                          onChange={onChange}
                          required="true"
                          value={sale.installment}
                          sx={{
                            m: 2,
                          }}
                        />

                        <TextField
                          id="outlined-read-only-input"
                          label="Valor total"
                          name="totalvalue"
                          value={sale.totalvalue}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{
                            m: 2,
                          }}
                        />

                        <TextField
                          id="outlined-read-only-input"
                          label="Latitude"
                          name="latitude"
                          value={sale.latitude}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{
                            m: 2,
                          }}
                        />

                        <TextField
                          id="outlined-read-only-input"
                          label="Longitude"
                          name="longitude"
                          value={sale.longitude}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{
                            m: 2,
                          }}
                        />
                      </MDBox>

                      
                    </MDBox>

                  </MDBox>
                  <MDBox m={5} p={5}>
                    <MDButton type="submit" color="info">
                      Cadastrar
                    </MDButton>
                    &nbsp;&nbsp;&nbsp;
                    <MDButton color="info" onClick={() => onCancel()}>Cancelar</MDButton>
                  </MDBox>
                </form>
                <MDBox display="flex" justifyContent="space-between" m={2}>
                  <Sacola sale={sale} setSale={setSale}/>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FormSale;
