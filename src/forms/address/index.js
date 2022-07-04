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
import { useNavigate, useParams } from "react-router-dom";
import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


function FormAddress() {
  const { id } = useParams();
  const navigate = useNavigate();

  // const { firstname, lastname, cpf, birthdate } = req.body
  // const { number, street, district, city, state, country, zipcode } = req.body

  const initAddress = {
    id: 0,
    number: "",
    street: "",
    district: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  };
  const [address, setAddress] = useState(initAddress);
  const [sentinela, setSentinela] = useState(false);

  //get para alteração de usuários
  useEffect(() => {
    if (id !== null || id !== "") {
      if (!sentinela) {
        api.get(`/address/${id}`).then((response) => {
          setAddress({ ...response.data.address });

        });
        setSentinela(true);
      }
    }
  }, [id, sentinela]);


  function onSubmit(ev) {
    ev.preventDefault();
    api.patch("/address", address).then((response) => {
      alert("Endereço alterado com sucesso!");
      navigate("/address");
    });
  }

  //pode-se adicionar um verificador para confirmar saída.
  function onCancel(ev) {
    navigate("/address");
  }

  function onChange(ev) {
    const { name, value } = ev.target;
    setAddress({ ...address, [name]: value, });
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
                  Alterar endereço
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
                        Endereço
                      </MDTypography>
                    </MDBox>
                    <MDBox m={3}>
                      <MDInput
                        type="text"
                        label="Rua"
                        name="street"
                        onChange={onChange}
                        value={address.street}
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
                        value={address.number}
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
                        value={address.district}
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
                        value={address.city}
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
                        value={address.state}
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
                        value={address.country}
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
                        value={address.zipcode}
                        required="true"
                        sx={{
                          m: 2,
                        }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox m={5} p={5}>
                    <MDButton type="submit" color="info">
                      Atualiazr
                    </MDButton>
                    &nbsp;&nbsp;&nbsp;
                    <MDButton color="info" onClick={() => onCancel()}>Cancelar</MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FormAddress;
