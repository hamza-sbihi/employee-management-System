import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

export default class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
       }
    componentDidMount(){
        if(this.state.id ==-1){
            return

        }
        else{
            EmployeeService.getEmployeeById(this.state.id).then(res =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                 lastName: employee.lastName,
                 emailId: employee.emailId})
             });
        }

        }

    saveEmployee = (e) =>{
        e.preventDefault();
        let employee = {firstName:this.state.firstName, lastName:this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));
        if(this.state.id ==-1){        
            EmployeeService.creatEmployee(employee).then(res =>{
            this.props.history.push('/employees');
        });}
        else{
            EmployeeService.putEmployee(this.state.id, employee).then(res =>{
                this.props.history.push('/employees');
            });
        }


    }

    changeFirstNameHandler= (event)=>{
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler= (event)=>{
        this.setState({lastName: event.target.value});
    }
    changeEmailHandler= (event)=>{
        this.setState({emailId: event.target.value});
    }
    cancel(){
        this.props.history.push('/employees');
    }
    getTitle(){
        if(this.state.id ==-1){
            return <h3 className="text-center">AddEmployee</h3>;
        }
        else return <h3 className="text-center">UpdateEmployee</h3>;
    }

    render() {
    return (
      <div>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-nd-3">
                    {this.getTitle()}
                    <div className="card-body">
                        <form>
                           <div className="form-group" style={{marginTop: "10px"}}>
                            <label style={{marginBottom: "10px"}} >First Name:</label>
                            <input placeholder="First Name" name="firstName" className="form-control"
                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                            </div> 
                            <div className="form-group" style={{marginTop: "10px"}}>
                            <label style={{marginBottom: "10px"}} >Last Name:</label>
                            <input placeholder="Last Name" name="lastName" className="form-control"
                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                            </div>
                            <div className="form-group" style={{marginTop: "10px"}}>
                            <label style={{marginBottom: "10px"}} >Email Adress:</label>
                            <input placeholder="Email Adress" name="emailId" className="form-control"
                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                            </div>

                            <button className="btn btn-success" onClick={this.saveEmployee} style={{marginTop: "10px"}}>Save</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px",marginTop: "10px"}}>Cancel</button>
                            
                
                        </form>
                    </div>

                </div>
            </div>
        </div>
      </div>
    )
  }
}
