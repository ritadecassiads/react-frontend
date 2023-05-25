import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Aside from "./Aside";
import Footer from "./Footer";

// objeto da memoria do react usado para transportar informacoes de um componente para outros
// será renderizado outro componente no lugar do props
// recebe props como parametro que será passado(outro componente) no index no meio das tags Layout
function Layout(props) {
  return (
    <>
      <Header />
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
