import React, { useState } from 'react'
import pic from '../assets/employee-img2.jpg'
import {
  Link,
  useParams
} from 'react-router-dom'
import '../EmployeeCard/style.css'
import { Container, Card, Col, Button, Row } from 'react-bootstrap';
import { ReactComponent as Telephone } from '../assets/telephone-fill.svg'
import { ReactComponent as Envolop } from '../assets/envelope-fill.svg'
import { ReactComponent as Chat } from '../assets/chat-fill.svg'
import { ReactComponent as Star } from '../assets/star-fill.svg'
import { ReactComponent as Heart } from '../assets/heart-fill.svg'
import FullEmployee from '../FullempDetails';
import { Modal } from 'react-bootstrap';
interface props {
  Employee_Img: any,
  _id: string,
  Preffered_Name: string,
  Designation: string,
  Department: string
}

const EmployeeCard: React.FC<props> = ({ _id, Employee_Img, Preffered_Name, Designation, Department }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //Component to diaplay the employee card  

  return (
    <>
      <Link to={``} style={{
        textDecoration: 'none',
        color: 'black'
      }} >
        <div className="employee-details cards-background-color m-4">
          <Card className='cards cards-background-color'>
            <Col>
              <Row onClick={() => {
                handleShow()
              }}>

                <img src={Employee_Img} alt="Employee2" className="employee-image" />

                <p className="employee-name position-relative">{Preffered_Name}</p>
                <p className="employee-designation position-relative card-details-color">{Designation}</p>
                <p className="employee-department position-relative card-details-color">{Department}</p>
                <ul className="social-icons position-relative card-details-color">

                  <li className="social-icon ">
                    <Telephone />
                  </li>
                  <li className="social-icon ">
                    <Envolop />
                  </li>
                  <li className="social-icon ">
                    <Chat />
                  </li>
                  <li className="social-icon ">
                    <Star />
                  </li>
                  <li className="social-icon ">
                    <Heart />
                  </li>
                </ul>
              </Row>
            </Col>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <FullEmployee id={_id} closeEditform={handleClose} />
            </Modal.Body>
          </Modal>
        </div>
      </Link>
    </>
  )
}
export default EmployeeCard
