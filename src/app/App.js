import React, { Component } from 'react';


class App extends Component{
    constructor(){
        super();
        this.state = {
            titulo:'',
            descripcion:'',
            tareas:[],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTarea = this.addTarea.bind(this);

    }
    

    addTarea(e){
        if (this.state._id){
            fetch(`/api/tareas/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json' 
                }
            })
            .then (res => res.json())
            .then (datos => {
                console.log(datos)
                M.toast({html: 'Tarea actualizada'});
                this.setState({
                    titulo:'',
                    descripcion:'',
                    _id:''
                });
                this.obtenerTareas();
            });
        } else{
            fetch('/api/tareas', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json' 
                }
            })
                .then(res => res.json())
                .then(datos => {
                    console.log(datos)
                    M.toast({html: 'Tarea Guardada'});
                    this.setState({titulo: '', descripcion:''});
                    this.obtenerTareas();
                })
                .catch (error => console.log(error));
        }


        e.preventDefault();

    }
    
    componentDidMount(){
        this.obtenerTareas();
    }

    obtenerTareas(){
            fetch('api/tareas/') 
            .then(res => res.json())
            .then(datos => {
                this.setState({tareas: datos});
                console.log(this.state.tareas);
            });
        } 

    eliminarTarea(id){
        if (confirm('¿Estas seguro/a de querer eliminar esta tarea?')) {
            fetch('/api/tareas/' + id,{
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json' 
                }
            })
            .then(res => res.json())
            .then(datos => {
                console.log(datos)
                M.toast({html: 'Tarea eliminada'})
                this.obtenerTareas();
            });
        }        
    }

     editarTarea(id){
         fetch(`/api/tareas/${id}`)
             .then(res => res.json())
             .then(datos => {
                 console.log(datos);
                 this.setState({
                     titulo: datos.titulo,
                     descripcion: datos.descripcion,
                     _id: datos._id
                 });
             });

     }

    handleChange(e){
         const { name, value} = e.target;
         this.setState({
             [name]: value
         });
    }
    
    
    render(){
        return(
            <div> 
                {/* navegacion */}
                <nav className="blue-grey darken-3">
                    <div className="container">
                        <a className="brand-logo" href="/">Tareas</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" name="titulo" onChange={this.handleChange} placeholder="Titulo de la Tarea" value={this.state.titulo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="descripcion" onChange= {this.handleChange} placeholder="Descripción de la Tarea" className="materialize-textarea"  value={this.state.descripcion}/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn blue-grey darken-3 ">
                                            Enviar
                                        </button>
                                    </form>    
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                       <th>Titulo</th>
                                       <th>Descripción</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tareas.map (tarea => {
                                            return(
                                                <tr key={tarea._id}>
                                                    <td>
                                                        {tarea.titulo}
                                                    </td>
                                                    <td>
                                                        {tarea.descripcion}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => this.eliminarTarea (tarea._id)} className="btn blue-grey darken-3" >
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn blue-grey darken-3" style={{margin:'4px'}} onClick={()=> this.editarTarea(tarea._id)}>
                                                        <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                            }
                                        )
                                    }
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