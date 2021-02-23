import React from 'react'
import update from 'immutability-helper'
import APIInvoker from "../utils/APIInvoker";

class Login extends React.Component{

    constructor() {
        super();
        this.state = {
            username:'',
            password:''
        }
    }

    changeField(e) {

        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }

    usernameValidate(e){
        let username = this.state.username
        APIInvoker.invokeGET(`/users/usernameValidate/${username}`,
            data => {
                this.label.innerHTML = data.message
            },
            error => {
                this.label.innerHTML = error.message
            })
    }

    render() {
        return(
            <div className="center">
                <div className="card">
                    <div className="card-body">
                        <h1>Mi tiendita</h1>
                        <form>
                            <h4>Iniciar sesión</h4>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="text"
                                       name="username"
                                       id="username"
                                       placeholder="Manuel"
                                       aria-describedby="usernameHelp"
                                       value={this.state.username}
                                       onChange={this.changeField.bind(this)}
                                       onBlur={this.usernameValidate.bind(this)}/>
                                <label htmlFor="username">Nombre de usuario</label>
                                <div id="usernameMessage"
                                     ref={self => this.label = self}
                                     className="form-text text-black">
                                </div>
                            </div>
                            <div className="form-floating">
                                <input className="form-control"
                                       type="password"
                                       name="password"
                                       id="password"
                                       placeholder="1234"
                                       aria-describedby="passwordHelp"
                                       value={this.state.password}
                                       onChange={this.changeField.bind(this)}/>
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <div id="passwordHelp"
                                     className="form-text text-danger">
                                </div>
                            </div>
                            <br/>
                            <div>
                                <button className="btn btn-outline-success"
                                        type="button"
                                        onClick={this.buttonOnClick.bind(this)}>Iniciar sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    buttonOnClick(e){
        //Signup
        let user = {
            userName: this.state.username,
            password: this.state.password
        }
        APIInvoker.invokePOST('/users/login',user, data => {
            alert(JSON.stringify(data))
        }, error => {
            alert(JSON.stringify(error))
        })
        e.preventDefault();
    }
}

export default Login;