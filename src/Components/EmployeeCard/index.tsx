import React, { useState } from 'react'
import pic from '../assets/employee-img2.jpg'
import {
  Link,
  useParams
} from 'react-router-dom'
import '../EmployeeCard/style.css'
import {Container ,Card, Col, Button, Row} from 'react-bootstrap';  
import employee from '../Interface/Interface';
import {ReactComponent as Telephone} from'../assets/telephone-fill.svg'
import {ReactComponent as Envolop} from'../assets/envelope-fill.svg'
import {ReactComponent as Chat} from'../assets/chat-fill.svg'
import {ReactComponent as Star} from'../assets/star-fill.svg'
import {ReactComponent as Heart} from'../assets/heart-fill.svg'
interface props{
  Employee_Img:any,
  _id:string,
  Preffered_Name:string,
  Designation:string,
  Department:string
}

const EmployeeCard:React.FC<props> = ({_id,Employee_Img,Preffered_Name,Designation,Department}) => {
  
//Component to diaplay the employee card  
  
  return (
    <>
    <Link to={`/employee/${_id}`} style={{textDecoration: 'none',
    color: 'black'}} >
    <div className="emp-details m-4" >
      
      <Card className='cards'>
        <Col>
          <Row>
            <img src={Employee_Img} alt="Employee2" className="emp-image"/>
          
            <p className="emp-name list_head position-relative">{Preffered_Name}</p>
            <p className="emp-dsgn list_elm position-relative">{Designation}</p>
            <p className="emp-dept list_elm position-relative">{Department}</p>
            <ul className="emp-icons position-relative">
                
                <li className="emp-icon ">
                    <Telephone/>
                </li>
                <li className="emp-icon ">
                    <Envolop/>
                </li>
                <li className="emp-icon ">
                    <Chat/>
                </li>
                <li className="emp-icon ">
                    <Star/>
                </li>
                <li className="emp-icon ">
                    <Heart/>
                </li>
            </ul>
          </Row>
        </Col>
      </Card>
      
      
    </div>
    </Link>
    </>
  )
}
export default EmployeeCard
