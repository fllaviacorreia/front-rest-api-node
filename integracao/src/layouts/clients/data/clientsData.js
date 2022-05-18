// /* eslint-disable react/prop-types */
// /* eslint-disable react/function-component-definition */
// /**
// =========================================================
// * Material Dashboard 2 React - v2.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2022 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import React from "react";

// // import api from "services/api";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// // import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";
// // import MDButton from "components/MDButton";
// // import EditRoundedIcon from '@mui/icons-material/EditRounded';
// // import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import { Icon } from "@mui/material";

// // Images
// // import team2 from "assets/images/team-2.jpg";
// // import team3 from "assets/images/team-3.jpg";
// // import team4 from "assets/images/team-4.jpg";

// export default function data(clients, ButtonDelete) {
//   console.log("clients em clientsData = ", clients);


//   const FullName = ({ firstName, secondName }) => (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       <MDBox ml={2} lineHeight={1}>
//         <MDTypography display="block" variant="button" fontWeight="medium">
//           {firstName} {secondName}
//         </MDTypography>
//       </MDBox>
//     </MDBox>
//   );


//   const Active = ({ tipo, cor }) => (
//     <MDBadge badgeContent={tipo} color={cor} variant="gradient" size="sm" />
//   );

//   const GenericInformation = ({ information }) => (
//     <MDTypography variant="caption" color="text" fontWeight="medium">
//       {information}
//     </MDTypography>
//   );

//   const EditClient = ({ id }) => (
//     <MDTypography component="a" href={`/clients/edit/${id}`} iconOnly>
//       <Icon color="info" fontSize="small">editrounded</Icon>
//     </MDTypography>
//   )

//   function dateFormat(data) {
//     var formatter = new Date(data).toLocaleDateString('pt-BR');
//     return <GenericInformation information={formatter} />
//   }

//   // function timeFormat(date) {
//   //   var formatter = new Date(data).toLocaleTimeString('pt-BR');
//   //   console.log(formatter);
//   //   return <GenericInformation information={formatter} />
//   // }

//   function typeActive(tipo) {
//     if (tipo) {
//       return <Active tipo="ATIVO" cor="success" />
//     } else {
//       return <Active tipo="INATIVO" cor="dark" />
//     }
//   }

//   return {
//     columns: [
//       { Header: "nome", accessor: "nome", width: "30%", align: "left" },
//       { Header: "data de nascimento", accessor: "dataNascimento", align: "left" },
//       { Header: "cpf", accessor: "cpf", align: "center" },
//       { Header: "situação", accessor: "situacao", align: "center" },
//       { Header: "quando cadastrado", accessor: "quandoCadastrado", align: "center" },
//       { Header: "ação", accessor: "acao", align: "center" },
//     ],

//     rows: clients.map(client =>
//     ({
//       nome: (
//         <FullName firstName={client.first_name} secondName={client.last_name} />
//       ),
//       dataNascimento: (
//         dateFormat(client.birth_date)
//       ),
//       cpf: (
//         <GenericInformation information={client.cpf} />
//       ),
//       situacao: (
//         typeActive(client.active)
//       ),
//       quandoCadastrado: (
//         dateFormat(client.createdAt)
//       ),
//       acao: (
//         <MDBox display="flex" alignItems="center" lineHeight={1}>
//           <MDBox ml={2} lineHeight={1}>

//             < EditClient id={client.id} />
//           </MDBox>
//           <MDBox ml={2} lineHeight={1}>

//             < ButtonDelete id={client.id} />
//           </MDBox>
//         </MDBox>
//       )
//     })),


//   };
// }