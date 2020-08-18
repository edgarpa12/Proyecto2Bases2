import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateSimulation extends Component {
  state = {
    dateBegin: new Date(),
    dateEnd: new Date(),
    _id: "",
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,      
      date: this.state.date,
    };
    console.log(newNote);
    axios.post("http://localhost:4000/api/notes", newNote);

    window.location.href = "/";
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Crear Simulacion</h4>
          <form onSubmit={this.onSubmit}>
            {/* Note Title */}
            <div className="form-group">
              <input
                type="text"

                className="form-control"
                placeholder="Destino"
                onChange={this.onInputChange}
                name="title"
                value={this.state.title}
                required
              />
            </div>
            {/* Note Date */}
            <div className="form-group">
                Fecha Inicio: 
              <DatePicker
              
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            
            <div className="form-group">
                Fecha Fin: 
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <button className="btn btn-primary">
              Simular <i className="material-icons">directions_bus</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
