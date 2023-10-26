var contenido = document.querySelector("#footer");

contenido.innerHTML +=` 
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Untitled</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="css/footer.css">
</head>

<body>
    <div class="footer-clean">
        <footer ">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-sm-3 col-md-4 item">
                        <h3>Servicios</h3>
                        <ul>
                            <li><a href="#">Sitio Web</a></li>
                            <li><a href="#">Proximos Eventos</a></li>
                            <li><a href="#">Mis Eventos</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3 col-md-4 item">
                        <h3>SISEV</h3>
                        <ul>
                            <li><a href="#">Limpeza de playas</a></li>
                            <li><a href="#">Campañas de reciclaje</a></li>
                            <li><a href="#">Sembrar árboles</a></li>
                        </ul>
                    </div>
                   
                    <div class="col-lg-4 item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a>
                        <p class="copyright">SISEV © 2023</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
</body>

</html>`;