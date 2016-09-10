# angular-api-transparencia-brasil
Acesso a API do Portal da Transparência Brasil para AngularJS

## Demo

[View demo](http://guiseek.js.org/angular-api-transparencia-brasil/)

### Config
```javascript
angular
  .module('AppController', ['ngAPITransparenciaBrasil'])
  .controller('AppController', ['$scope','APITransparenciaBrasilFactory',function($scope,APITransparenciaBrasilFactory) {
    APITransparenciaBrasilFactory.init({
      token: 'vRdqRoxdGSUk'
    })
  }])
```

### Creating controller
```javascript
angular
  .module('AppController')
  .controller('AppController', ['$scope','APITransparenciaBrasilFactory',function($scope,APITransparenciaBrasilFactory) {
    $scope.busca = {}
    $scope.loading = {}
    $scope.getEstados = function () {
      $scope.loading.estados = true
      APITransparenciaBrasilFactory.getEstados(function (response) {
        $scope.loading.estados = false
        $scope.estados = response.data
      })
    }
    $scope.getPartidos = function () {
      $scope.loading.partidos = true
      APITransparenciaBrasilFactory.getPartidos(function (response) {
        $scope.loading.partidos = false
        $scope.partidos = response.data
      })
    }
    $scope.getCargos = function () {
      $scope.loading.cargos = true
      APITransparenciaBrasilFactory.getCargos(function (response) {
        $scope.loading.cargos = false
        $scope.cargos = response.data
      })
    }
    $scope.getEstados()
    $scope.getPartidos()
    $scope.getCargos()
    $scope.getCandidatos = function (params) {
      $scope.loading = {}
      $scope.loading.candidatos = true
      $scope.candidatos = []
      $scope.candidato = {}
      var params = angular.copy(params) || {}
      APITransparenciaBrasilFactory.getCandidatos(params, function (response) {
        $scope.loading.candidatos = false
        $scope.candidatos = response.data
      })
    }
    var sum = function(data, field) {
      return data.reduce(function(p, c) {
        return (c[field] != null) ? p + parseFloat(c[field]) : 0; 
      }, 0);
    }
    $scope.getBens = function (id) {
      $scope.loading.bens = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/bens', function (response) {
        $scope.loading.bens = false
        $scope.candidato.montante = sum(response.data, 'montante');
        $scope.candidato.bens = response.data
      })
    }
    $scope.getDoadores = function (id) {
      $scope.loading.doadores = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/doadores', function (response) {
        $scope.loading.doadores = false
        $scope.candidato.montante = sum(response.data, 'montante');
        $scope.candidato.doadores = response.data
      })
    }
    $scope.getEstatisticas = function (id) {
      $scope.loading.estatisticas = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/estatisticas', function (response) {
        $scope.loading.estatisticas = false
        $scope.candidato.estatisticas = response.data
      })
    }
    $scope.getCandidaturas = function (id) {
      $scope.loading.candidaturas = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/candidaturas', function (response) {
        $scope.loading.candidaturas = false
        $scope.candidato.votosObtidos = sum(response.data, 'votosObtidos');
        $scope.candidato.recursosFinanceiros = sum(response.data, 'recursosFinanceiros');
        $scope.candidato.candidaturas = response.data
      })
    }
    $scope.nav = {}
    $scope.changeEstado = function (item) {
      $scope.nav.estado = item
      $scope.busca.estado = item.sigla
    }
    $scope.changePartido = function (item) {
      $scope.nav.partido = item
      $scope.busca.partido = item.partidoId
    }
    $scope.changeCargo = function (item) {
      $scope.nav.cargo = item
      $scope.busca.cargo = item.cargoId
    }
  }])
```

### Creating page
```html
<body data-ng-controller="AppController">

  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
        <a class="navbar-brand" href="#">Angular - API Transparência Brasil</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span data-ng-bind="nav.estado.nome || '- Selecione um estado -'"></span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#" ng-repeat="item in estados" ng-model="nav.estado" data-ng-bind="item.nome" data-ng-click="changeEstado(item)"></a>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span data-ng-bind="nav.partido.sigla || '- Selecione um partido -'"></span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#" ng-repeat="item in partidos" ng-model="nav.partido" data-ng-bind="item.sigla" data-ng-click="changePartido(item)"></a>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span data-ng-bind="nav.cargo.nome || '- Selecione um cargo -'"></span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#" ng-repeat="item in cargos" ng-model="nav.cargo" data-ng-bind="item.nome" data-ng-click="changeCargo(item)"></a>
              </li>
            </ul>
          </li>
        </ul>
        <form class="navbar-form navbar-left" role="search">
          <button type="button" class="btn btn-default" data-ng-click="getCandidatos(busca)" data-ng-disabled="!busca.estado || !busca.partido">Buscar</button>
        </form>
      </div>
    </div>
  </nav>

  <main class="container">
    <div class="row" ng-show="!busca.estado || !busca.partido">
      <div class="col-md-12">
        <p class="alert alert-info">
          Selecione no mínimo um estado e um partido para buscar...
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p ng-show="loading.candidatos">Carregando candidatos...</p>
        <p ng-show="candidatos.length == 0">Nenhum resultado</p>
        <div ng-show="candidatos.length > 0">
          <h1 class="page-header">Candidatos</h1>
          <div class="panel panel-default" ng-show="candidatos.length > 0">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th colspan="2">Aplido</th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="candidato in candidatos">
                  <td ng-bind="candidato.nome"></td>
                  <td ng-bind="candidato.apelido"></td>
                  <td>
                    <button type="button" class="btn btn-default" ng-click="getBens(candidato.id)">Bens</button>
                    <button type="button" class="btn btn-default" ng-click="getDoadores(candidato.id)">Doadores</button>
                    <button type="button" class="btn btn-default" ng-click="getEstatisticas(candidato.id)">Estatísticas</button>
                    <button type="button" class="btn btn-default" ng-click="getCandidaturas(candidato.id)">Candidaturas</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p ng-show="loading.bens">Carregando bens...</p>
        <div ng-show="candidato.bens">
          <hr>
          <h1>Bens</h1>
          <p ng-show="candidato.bens.length == 0">Nenhum resultado</p>
          <div class="panel panel-default" ng-show="candidato.bens.length > 0">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Ano</th>
                  <th>Bem</th>
                  <th style="width: 200px">Montante</th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="bem in candidato.bens">
                  <td ng-bind="bem.ano"></td>
                  <td ng-bind="bem.bem"></td>
                  <td ng-bind="bem.montante | currency : 'R$ ' : 2"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">Total:</td>
                  <td ng-bind="candidato.montante | currency : 'R$ ' : 2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p ng-show="loading.doadores">Carregando doadores...</p>
        <div ng-show="candidato.doadores">
          <hr>
          <h1>Doadores</h1>
          <p ng-show="candidato.doadores.length == 0">Nenhum resultado</p>
          <div class="panel panel-default" ng-show="candidato.doadores.length > 0">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th colspan="2">CPF / CNPJ</th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="doador in candidato.doadores">
                  <td ng-bind="doador.nome"></td>
                  <td ng-bind="doador.cgc"></td>
                  <td ng-bind="doador.montante | currency : 'R$ ' : 2"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">Total:</td>
                  <td ng-bind="candidato.montante | currency : 'R$ ' : 2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p ng-show="loading.estatisticas">Carregando estatísticas...</p>
        <div ng-show="candidato.estatisticas">
          <hr>
          <h1>Estatísticas</h1>
          <p ng-show="candidato.estatisticas.length == 0">Nenhum resultado</p>
          <div class="panel panel-default" ng-show="candidato.estatisticas.length > 0">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Faltas</th>
                  <th>Média de faltas</th>
                  <th>Comissões</th>
                  <th>Média de comissões</th>
                  <th>Evolução</th>
                  <th>Bens</th>
                  <th>Emendas</th>
                  <th>Média emendas</th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="estatistica in candidato.estatisticas">
                  <td ng-bind="estatistica.faltasPlenario"></td>
                  <td ng-bind="estatistica.mediaPlenario"></td>
                  <td ng-bind="estatistica.faltasComissoes"></td>
                  <td ng-bind="estatistica.mediaComissoes"></td>
                  <td ng-bind="estatistica.evolucao"></td>
                  <td ng-bind="estatistica.anoRef"></td>
                  <td ng-bind="estatistica.emendas"></td>
                  <td ng-bind="estatistica.mediaEmendas"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p ng-show="loading.candidaturas">Carregando candidaturas...</p>
        <div ng-show="candidato.candidaturas">
          <hr>
          <h1>Candidaturas</h1>
          <p ng-show="candidato.candidaturas.length == 0">Nenhum resultado</p>
          <div class="panel panel-default" ng-show="candidato.candidaturas.length > 0">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Ano</th>
                  <th>Cargo</th>
                  <th>Partido</th>
                  <th>Município</th>
                  <th>Estado</th>
                  <th>Resultado</th>
                  <th>Votos</th>
                  <th>Recursos</th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="candidatura in candidato.candidaturas">
                  <td ng-bind="candidatura.anoEleitoral"></td>
                  <td ng-bind="candidatura.cargo"></td>
                  <td ng-bind="candidatura.partidoSigla"></td>
                  <td ng-bind="candidatura.municipio"></td>
                  <td ng-bind="candidatura.estadoSigla"></td>
                  <td ng-bind="candidatura.resultado"></td>
                  <td ng-bind="candidatura.votosObtidos | number"></td>
                  <td ng-bind="candidatura.recursosFinanceiros | currency : 'R$ ' : 2"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6" class="text-right">Total:</td>
                  <td ng-bind="candidato.votosObtidos | number"></td>
                  <td ng-bind="candidato.recursosFinanceiros | currency : 'R$ ' : 2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="../node_modules/angular/angular.min.js"></script>
  <script src="../dist/bundle.min.js"></script>
  <script src="app.js"></script>
```
---

## Changelog

Version | Description
--- | ---
1.0.1 | Improvements in docs

## Developer

### npm scripts

Command | Description
--- | ---
npm run build | Concat, Babelify and Minify 