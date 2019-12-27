import React, { Component } from "react";
import $ from "jquery";
import "./css/pure-min.css";
import "./css/side-menu.css";
import InputCustomizado from './Components/InputCustomizado';
import BotaoCustomizado from './Components/BotaoCustomizado';
class App extends Component {
  constructor() {
    super();
    this.state = {
      lista: [{ id:0, nome: "igor", email: "igor@gmail.com" }], nome:'', email:'',senha:''
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount(){
    $.ajax({
        //url:"https://instalura-api.herokuapp.com/api/public/fotos/rafael",
        url:"https://cdc-react.herokuapp.com/api/autores",
        dataType: 'json',
        success:function(resposta){
          console.log(resposta);
          this.setState({lista:resposta});
          }.bind(this)
      }
    );
  }
  enviaForm(evento){
    evento.preventDefault();    
    $.ajax({
      url:'https://cdc-react.herokuapp.com/api/autores',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success: (resposta)=>{
        this.setState({lista:resposta});
        console.log("enviado com sucesso");
      },
      error: function(resposta){
        console.log("erro");
      }      
    });
  }
  setNome(event) {
    this.setState({nome:event.target.value})
    
  }
  setEmail(event) {
    console.log(event.target.value);
    this.setState({email:event.target.value})
    
  }
  setSenha(event) {
    this.setState({senha:event.target.value})
    
  }
  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">
              Company
            </a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Home
                </a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Autor
                </a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                  Livro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
              <InputCustomizado id="nome" type="text" name="nome" label="Nome:" value={this.state.nome} onChange={this.setNome}/>
              <InputCustomizado id="email" type="email" name="email" label="E-mail:" value={this.state.email} onChange={this.setEmail}/>
              <InputCustomizado id="senha" type="password" name="email" label="Senha:" value={this.state.senha} onChange={this.setSenha}/>
              <BotaoCustomizado label="Gravar"/>
              </form>
            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.lista.map(autor => {
                    return (
                      <tr key={autor.id}>
                        <td>{autor.nome}</td>
                        <td>{autor.email}</td>
                      </tr>
                    );
                  })}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
