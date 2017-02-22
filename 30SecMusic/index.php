<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="estilo/js/bootstrap.js" 		type="text/javascript"></script>
	<script src="estilo/js/handlebars.min.js" 	type="text/javascript" ></script>
	<script src="estilo/js/annyang.min.js" 	type="text/javascript" ></script>
	<script src="estilo/js/menu.js" 	type="text/javascript" ></script>
	<script src="estilo/js/busca.js" 	type="text/javascript" ></script>
	<link href="estilo/css/bootstrap.css" rel="stylesheet" type="text/css" />
	<link href="estilo/css/style.css" rel="stylesheet" type="text/css" />

	<nav class="navbar navbar-findcond navbar-fixed-top menu">
		<div class="container">
			<div class="navbar navbar-header">
				<a class="navbar-brand brand" href="">30Sec Music</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar">
				<ul class="nav navbar-nav navbar-right">
					<li>
						<a class="menu_text" onclick="scrollTo('about')" style="cursor: pointer;">
							Sobre nós
						</a>
					</li>
					<li>
						<a class="menu_text" onclick="scrollTo('textSearch')" style="cursor: pointer;">
							Pesquisa Por Texto
						</a>
					</li>
					<li>
						<a class="menu_text" onclick="scrollTo('voice')"  style="cursor: pointer;">
							Pesquisa Por Voz  
						</a>
					</li>
					<li>
						<a class="menu_text" onclick="scrollTo('speaks')"  style="cursor: pointer;">
							Histórico de Falas</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

	</head>

	<body id="home">
		<div class="container-fluid">
			<div class="row">
				<div class="txt-welcome col-md-12 text-center">
					<h1 class="titulo ">30Sec Music</h1>
					<h4 class="descricao ">Seja Bem Vindo</h4>
				</div>
				<img src="estilo/img/music.jpg" class="topback"></img>
			</div>
			<div class="espc" id="about">
			<div class="container">
				<div class="row">
					<div class="col-md-12 sobre">
						<h1> O que é o 30sec ?</h1>
						<p> O 30sec é um site que utiliza de um serviço do Spotify para tocar trechos de música (para ser mais exato 30 segundos de música)afim de te ajudar a conhecer novos cantores,músicas ou albums. Você pode começar pesquisando uma música, autor ou album na nossa barra de pesquisa. Caso você não queira digitar basta falar, isso mesmo falar o site possui comandos específicos para ajudar na sua busca.</p>

						<p> Bom resumindo este é o site perfeito caso você queira conhecer um cantor música ou album sem ter que ficar criando contas, basta falar ou escrever.</p>

						<hr></hr>
					</div>
				</div>
			</dir>
			<div class="espc" id="textSearch"></div>
			<div class="container"> 
				<h1>Busque um Album, Autor ou Música: </h1>
				<h4>Se preferir pode utilizar o comando de voz 
					<img src="estilo/img/microphone.png" width="20" height="20"></h4>
					<form id="search-form">
						<input type="text" id="query" value="" class="form-control" placeholder="Buscar" />
						<input type="submit" id="search" class="btn btn-success btn_busca" value="Buscar" onclick="buscador()" />
					</form>	

					<h3 id="descricao" style="visibility: hidden;">Clique para ter uma amostra da música</h3>
					<div id="results"></div>
				</div>
				<div class="container">
					<div class="row" id="musicas">
						<div class="col-md-12">
							<script id="results-template" type="text/x-handlebars-template">
								{{#each albums.items}}
								<div class="col-md-4">
									<div style="background-image:url({{images.0.url}})" data-album-id="{{id}}" class="cover img-rounded">
									</div>
									<br>
								</div>
								{{/each}}
							</script>
						</div>
					</div>
				</div>

				<div class="espc"  id="voice"></div>
				<div id="commands">
					<a  id="buscaPorVoz"></a>
					<div class="container textos">
						<div class="row">
							<div class="col-md-12" name="buscaPorVoz">
								<h1>Você sabia que pode colocar músicas por comando de voz ?</h1>
								<ul>
									<li>Não ??? Então vamos testar tente falando "Play Some Nights"</li>
									<li> Legal não ? Este é apenas um comando teste os outros</li>
								</ul>

								<h2>Comandos de Voz</h2>
								<ul>
									<li>Diga "Play" e "Nome da Música" exemplo "Play Stitches"</li>
									<li>Diga "Play Nome da Música by Nome do Artista" exemplo "Play Stitches by Shawn Mendes"</li>
									<ul>
										<li>Lista de Comandos</li>
										<li>Comando "Stop" que para a música</li>
										<li>Comando "Home" vai até o início da página</li>
										<li>Comando "About" vai até o Sobre nós</li>
										<li>Comando "Search + Sua pesquisa" que busca para você</li>
										<li>Comando "Speaks" vai até o Histórico De Falas </li>
									</ul>
								</ul>
							</div>
						</div>
						<div class="espc" id="speaks"></div>
						<h1>Histórico de Falas</h1>
						<div id="conversation"></div>
					</div>
				</div>

				<footer>
					<hr class="footer"></hr>
					<div class="col-md-12">
						<h4 class="muted pull-right">© 2016. Desenvolvido por Caio Lima</h4>
						<a href="https://www.facebook.com/kaioo.lima.9" target="_blank">
							<img src="estilo/img/facebook.png">
						</a>
						<a href="https://br.linkedin.com/in/caio-lima-68bb82123" target="_blank">
							<img src="estilo/img/linkedin.png">
						</a>
					</div>
				</footer>
			</body>
			</html>