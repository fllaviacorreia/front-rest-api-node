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

import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from "react-router-dom";
import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";


function FormClient() {
  const { id } = useParams();
  const navigate = useNavigate();

  // const { firstname, lastname, cpf, birthdate } = req.body
  // const { number, street, district, city, state, country, zipcode } = req.body

  const initClient = {
    firstname: "",
    lastname: "",
    cpf: "",
    birthdate: "",
    active: "",
    number: "",
    street: "",
    district: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  };
  const [client, setClient] = useState(initClient);

  function onSubmit(ev) {
    ev.preventDefault(); 
    api.post("/client", client).then((response) => {
        alert("Cliente cadastrado com sucesso!");
        navigate("/clients");
    });
}

  //pode-se adicionar um verificador para confirmar saída.
  function onCancel(ev) {
    navigate("/clients");
  }

  function onChange(ev) {
    const { name, value } = ev.target;
    setClient({...client, [name]: value,});
  }

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={4}>
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
                Cadastrar novo cliente
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
                      Dados pessoais
                    </MDTypography>
                  </MDBox>
                  <MDBox m={3}>
                    <MDInput
                      type="text"
                      label="Nome"
                      name="firstname"
                      size="large"
                      onChange={onChange}
                      required="true"
                      value={client.firstname}
                      sx={{
                        m: 2,
                      }}
                    />

                    <MDInput
                      type="text"
                      label="Sobrenome"
                      name="lastname"
                      onChange={onChange}
                      required="true"
                      value={client.lastname}
                      sx={{
                        m: 2,
                      }}
                    />
 <MDInput
                      type="date"
                      label="Data de nascimento"
                      name="birthdate"
                      onChange={onChange}
                      value={client.birthdate}
                      required="true"
                      sx={{
                        p: 2,
                      }}
                    />
                    <InputMask
                      placeholder="CPF *"
                      name="cpf"
                      mask='999.999.999-99'
                      value={client.cpf}
                      onChange={onChange}
                      required="true">
                    </InputMask>

                   

                  </MDBox>
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
                      Endereço
                    </MDTypography>
                  </MDBox>
                  <MDBox m={3}>
                    <MDInput
                      type="text"
                      label="Rua"
                      name="street"
                      onChange={onChange}
                      value={client.street}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                    <MDInput
                      type="text"
                      label="Número"
                      name="number"
                      onChange={onChange}
                      value={client.number}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                    <MDInput
                      type="text"
                      label="Bairro"
                      name="district"
                      onChange={onChange}
                      value={client.district}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />

                    <MDInput
                      type="text"
                      label="Cidade"
                      name="city"
                      onChange={onChange}
                      value={client.city}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                    <MDInput
                      type="text"
                      label="Estado"
                      name="state"
                      onChange={onChange}
                      value={client.state}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                    <MDInput
                      type="text"
                      label="País"
                      name="country"
                      onChange={onChange}
                      value={client.country}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                    <MDInput
                      type="text"
                      label="Código Postal"
                      name="zipcode"
                      onChange={onChange}
                      value={client.zipcode}
                      required="true"
                      sx={{
                        m: 2,
                      }}
                    />
                  </MDBox>
                </MDBox>
                <MDBox m={5} p={5}>
                  <Button
                    type="submit"
                  >
                    Cadastrar
                  </Button>

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

export default FormClient;
