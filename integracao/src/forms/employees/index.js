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
import Button from "@mui/material/Button";

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


function FormEmployee() {
  const navigate = useNavigate();

  const initEmployee = {
    firstname: "",
    lastname: "",
    departmentid: 0,
  };

  const [employee, setEmployee] = useState(initEmployee);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("department").then((response) => {
      setDepartments(response.data.departments);
    });
  });

  async function saveDepartment(value) {
    try {
      await api.post('/department', { departmentname: value }).then((response) => {
        alert("Novo departamento cadastrado.")
      });
    } catch (err) {
      alert("Erro ao cadastrar departamento.");
    }
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post("/employee", employee).then((response) => {
      alert("Colaborador cadastrado com sucesso!");
      navigate("/employees");
    });
  }

  function newDepartment() {
    const departmentname = prompt("Insira o nome do departamento", "");
    console.log("item = ", departmentname);
    if (departmentname == null || departmentname === "") {
      alert("Nenhum valor inserido!");
    } else {
      saveDepartment(departmentname);
    }
  }

  //pode-se adicionar um verificador para confirmar saída.
  function onCancel(ev) {
    navigate("/employees");
  }

  function onChange(ev) {
    const { name, value } = ev.target;
    setEmployee({ ...employee, [name]: value, });
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
                  Cadastrar novo colaborador
                </MDTypography>
              </MDBox>

              <MDBox m={4}>
                <MDBox ml={2} lineHeight={1}>
                  <MDButton color="info" onClick={() => newDepartment()}>
                    Novo departamento
                  </MDButton>
                </MDBox>
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
                        value={employee.firstname}
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
                        value={employee.lastname}
                        sx={{
                          m: 2,
                        }}
                      />
                      <Select p={5}
                        placeholder="Departamento"
                        name="departmentid"
                        value={employee.departmentid}
                        onChange={onChange}
                        displayEmpty
                      >
                        <MenuItem value={0}>Selecione</MenuItem>

                        {departments.map((department) => (<MenuItem value={department.id}>{department.department_name}</MenuItem>))
                        }
                      </Select>
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
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FormEmployee;
