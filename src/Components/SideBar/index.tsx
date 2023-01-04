 import React from "react";
 import { Row } from "react-bootstrap";
 import { Col } from "react-bootstrap";
 import '../SideBar/style.css'
 import { Link,useSearchParams } from "react-router-dom";
 import Iemployee from "../Interface/Interface";
 interface props{
   show_sidebar:boolean
 }

 const SideBar:React.FC<props> = (show_sidebar) => {
   //retrieving data from local storage
   const employee:Iemployee[] = JSON.parse(localStorage.getItem("employees") || "[]")

   var departments:string[] = ["IT", "Human resources","MD","Sales",];
   var offices:string[] = ["Seattle", "India"];
   var job_titles:string[] = [
     "SharePoint Practice Head",
     ".Net Development Lead",
     "Recruiting Expert",
     "BI Developer",
     "Business Analyst",
     "Project Lead",
     "Summer Analyst",
     "Manager"
   ];
   //initialising empty arrays to store the count of each category
   var departments_count:number[] = [];
   var offices_count:number[] = [];
   var jbtitle_count:number[] = [];

   //loops to count the count of employees of each catogery(3 catogeries of side bar) and push them to the array

   departments.forEach((element) => {
     var cnt:Iemployee[]  = employee.filter((emp) => emp.Dept_Name == element);
     departments_count.push(cnt.length);
   });
   offices.forEach((element) => {
     var cnt:Iemployee[]  = employee.filter((emp) => emp.Office_Details == element);
     offices_count.push(cnt.length);
   });
   job_titles.forEach((element) => {
     var cnt:Iemployee[]  = employee.filter((emp) => emp.Title == element);
     jbtitle_count.push(cnt.length);
   });
     return (
       <>
         <div className="primary">
         <Row className="row">
             <Col sm={3}>
             <div className="lt">
               <ul className="menu-list">
                 <li className="list-header font-family3">Departments</li>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Department&value=IT'}><li id="it" className="font-family3 list-elm-color">IT{`(${departments_count[0]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Department&value=Human Resources'}><li id="hr" className="font-family3 list-elm-color">Human Resources{`(${departments_count[1]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Department&value=MD'}><li id="md" className="font-family3 list-elm-color">MD{`(${departments_count[2]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Department&value=Sales'}><li id="sales" className="font-family3 list-elm-color">Sales{`(${departments_count[3]})`}</li></Link>
               </ul>
               <ul className="menu-list">
                 <li className="list-header">Offices</li>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Office&value=Seattle'}><li id="seattle" className="font-family3 list-elm-color">Seattle{`(${offices_count[0]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Office&value=India'}><li id="india" className="font-family3 list-elm-color">India{`(${offices_count[1]})`}</li></Link>
               </ul>
               <ul className="menu-list">
                 <li className="list-header">Job Titles</li>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=SharePoint Practice Head'}><li id="share-pnt" className="font-family3 list-elm-color">SharePoint Practice Head{`(${jbtitle_count[0]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=.Net Development Lead'}><li id="net-dev" className="font-family3 list-elm-color">.Net Development Lead{`(${jbtitle_count[1]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=Recruiting Expert'}><li id="rectr-exp" className="font-family3 list-elm-color">Recruiting Expert{`(${jbtitle_count[2]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=BI Developer'}><li id="bi-dev" className="font-family3 list-elm-color">BI Developer{`(${jbtitle_count[3]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=Business Analyst'}><li id="b-anlys" className="font-family3 list-elm-color">Business Analyst{`(${jbtitle_count[4]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=Project Lead'}><li id="p-l" className="hidden1-class font-family3 list-elm-color">Project Lead{`(${jbtitle_count[5]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=Summer Analyst'}><li id="s-a" className="hidden1-class font-family3 list-elm-color">Summer Analyst{`(${jbtitle_count[6]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=Manager'}><li id="mgr" className="hidden1-class font-family3 list-elm-color">Manager{`(${jbtitle_count[7]})`}</li></Link>
                 <Link style={{textDecoration:'none'}} to={'/show_more'}><li className="blue font-family3 list-elm-color" id="view-more">
                   <a href="#" className= "view-clr font-family3 list-elm-color">View More</a>
                 </li></Link>
                 <Link style={{textDecoration:'none'}} to={'/filter?category=Job_Title&value=Summer Analyst'}><li className="blue hidden-class font-family3 list-elm-color" id="view-less">
                   <a href="#" className="hide-less view-clr font-family3 list-elm-color" >View Less</a>
                 </li></Link>
                
                
               </ul>
             </div>


             </Col>
           
            
            
         </Row>
     </div> 

 

     </>
   );
}
export default SideBar 
