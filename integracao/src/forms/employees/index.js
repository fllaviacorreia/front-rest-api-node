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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";


function FormEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initEmployee = {
    firstname: "",
    lastname: "",
    departmentid: "",
  };
  const [employee, setEmployee] = useState(initEmployee);

  //get para alteração de usuários
  useEffect(() => {
    if (id) {
      api.get(`/employee/${id}`).then((response) => {
        setEmployee(...response.data);
      });
    }
  }, []);

  function onSubmit(ev) {
    ev.preventDefault(); //pagina não regarrega novamente
    console.log("olá");
    //definindo se é create ou update para o método e url
    const method = id ? "put" : "post";
    const url = id ? `employee/${id}` : "/employee/";

    api[method](url, employee).then((response) => {
      navigate("/employees");
    });
  }

  function onCancel(ev) {
    navigate("/employees");
  }

  function onChange(ev) {
    const { name, value } = ev.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
    console.log(employee);
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
 
                       <MDInput type="text" 
                       label="Departamento" 
                         name="departmentid"
                         onChange={onChange}
                         value={employee.departmentid} 
                         required="true"
                         sx={{                      
                          m: 2,
                        }}
                        />
                        
                     </MDBox>
                   </MDBox>
                   <MDBox m={5} p={5}>
                     <Button
                       onClick={onSubmit}
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

export default FormEmployee;
