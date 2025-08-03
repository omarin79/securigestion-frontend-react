import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <strong>Copyright &copy; {currentYear} SecuriGestión Integral.</strong> Todos los derechos reservados.
            <br />
            [cite_start]<small>Proyecto de desarrollo de software para PROGRAMACION Y RASTREO SATELITAL JH SAS. [cite: 4155, 4288, 5627]</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;