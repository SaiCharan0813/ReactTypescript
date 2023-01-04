import React,{useState} from "react";
import { Link,useParams } from "react-router-dom";
import pic from '../assets/employee-img2.jpg'
import '../FullempDetails/style.css'
import Iemployee from "../Interface/Interface";
import EmployeeDir from "../EmployeeDir";
import {ReactComponent as Xoctagon} from'../assets/x-octagon.svg'

var image_url:any
const FullEmployee:React.FC =() => {
    //To retrieve the id from the url
    let {_id} = useParams();
    //To retrieve the employee details from local storage
    let ee:Iemployee[]=JSON.parse(localStorage.getItem("employees") || "[]");
    //To find the employee details from thr id sent in the url
    let current_emp:Iemployee=ee.find((emp)=>emp._id==_id)!
    //Declaring the all useState hooks needed below
    const [edit, setedit] = useState<boolean>(false)
    var [emp_img, setemp_img] = useState<string>("");
    const [f_name, setf_name] = useState<string>(current_emp.First_Name)
    const [l_name, setl_name] = useState<string>(current_emp.Last_Name)
    const [prfrd_name, setprfrd_name] = useState<string>(current_emp.Preffered_Name)
    const [jobtitle, setjobtitle] = useState<string>(current_emp.Title)
    const [office, setoffice] = useState<string>(current_emp.Office_Details)
    const [dept, setdept] = useState<string>(current_emp.Dept_Name)
    const [skypeid, setskypeid] = useState<string>(current_emp.Skype_Id)
    const [emial, setemial] = useState<string>(current_emp.Email_id)
    const [phno, setphno] = useState<string>(current_emp.phone_no.toString())
    const [alert, setalert] = useState<string>("")

    //Function used to validate the employee details when edited the particular employee

    function validateEmp():boolean {
        if (f_name.length == 0) {
        setalert("Please enter your first name!");
        return false;
        }
        if (l_name.length == 0) {
        setalert("Please enter your last name!");
        return false;
        }
        if (prfrd_name.length == 0) {
        setalert("Please enter your preffered name!");
        return false;
        }
        if (dept == "Select") {
        setalert("Please select a deartment name!");
        return false;
        }
        if (office == "Select") {
        setalert("Please select your office details!");
        return false;
        }
        if (jobtitle == "Select") {
        setalert("Please select a job title!");
        return false;
        }
        if (skypeid.length == 0) {
        setalert("Please enter your skype ID!");
        return false;
        }
        if (phno.length != 12) {
        setalert("Please enter a valid phone number!");
        return false;
        }

        var x = emial;
        var email_regex:RegExp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (email_regex.test(x) == false) {
        setalert("Please enter a valid Email ID !");
        
        return false;
        }

        return true;
    }
    function deletes(){
      localStorage.removeItem("employees")
    }
    // function deleting(rId: any){
    //   let temp = employes.filter((item: { id: any; }) => item.id != rId);
    //   localStorage.setItem("employees",JSON.stringify(temp))
    // }
    // deleting(current_emp._id)
    function previewFile(event : any){
      var file=event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend= (e) => {
        image_url = reader.result;
   
      }
      if(file){
        reader.readAsDataURL(file);
      }
     }
    //Function used to save the details of the employee to the local storage
  
    function saveDetails():void{
        let val_res:boolean=validateEmp()
        if(val_res){
            emp_img=image_url;
            current_emp.Employee_Img=emp_img
            current_emp._id=current_emp._id;
            current_emp.First_Name =f_name;
            current_emp.Last_Name =l_name;
            current_emp.Preffered_Name =prfrd_name;
            current_emp.Title =jobtitle;
            current_emp.Office_Details =office;
            current_emp.Dept_Name =dept;
            current_emp.Skype_Id =skypeid;
            current_emp.Email_id =emial;
            current_emp.phone_no =phno
        window.alert(`Employee ${f_name} details updated succesfully`)
        setalert('')
        setedit(false)
        localStorage.setItem("employees",JSON.stringify(ee))

        //To dispatch an event to let know for employee directory that the local storage has been updated

        window.dispatchEvent(new Event('storage')); 
        }
   
    }
 
  return (
    <>{
      <div id="employee-full-details" className="employee-fulldetails position-relative">
       <Link to={'/'}> 
      <Xoctagon
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="close bi bi-x"
        viewBox="0 0 16 16"
      />
        
      </Link>
      <img
        src={current_emp.Employee_Img}
        alt="employee"
        className="emp-image-fulldetails"
      />
     
      <div className="details-div">
        
      <label htmlFor="select_img"><b>Select Image</b></label>
                <input type="file"  id="image-input" name="imageurl" onChange={()=>previewFile(event)} accept="image/jpeg, image/png, image/jpg"  />
       
        <p className="head-text desc"><b>First Name : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.First_Name}</p>
        <input
          type="text"
          className={`head-text ${edit?'content-editable':'content-editable-hidden'} `}
          onChange={event => setf_name(event.target.value)}
          defaultValue={current_emp.First_Name}
        />
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Last Name : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.Last_Name}</p>
        <input
          type="text"
          className={`head-text ${edit?'content-editable':'content-editable-hidden'} `}
          onChange={event => setl_name(event.target.value)}
          defaultValue={current_emp.Last_Name}
        />
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Preffered Name : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.Preffered_Name}</p>
        <input
          type="text"
          className={`head-text ${edit?'content-editable':'content-editable-hidden'} `}
          onMouseOver={event => setprfrd_name(f_name+l_name)}
          defaultValue={current_emp.Preffered_Name}
        />
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Office : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.Office_Details}</p>
        <select  className={`head-text ${edit?'content-editable':'content-editable-hidden'} `} defaultValue={current_emp.Office_Details} onChange={event => setoffice(event.target.value)}>
          <option className="drop-options" value="Select">Select</option>
          <option value="Seattle">Seattle</option>
          <option value="India">India</option>
        </select>
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Job Title : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.Title}</p>
        <select className={`head-text ${edit?'content-editable':'content-editable-hidden'} `} defaultValue={current_emp.Title} onChange={event => setjobtitle(event.target.value)}>
          <option className="drop-options" value="Select">Select</option>
          <option className="drop-options" value="SharePoint Practice Head">
            SharePoint Practice Head
          </option>
          <option className="drop-options" value="Recruiting Expert">
            Recruiting Expert
          </option>
          <option className="drop-options" value=".Net Development Lead">
            .Net Development Lead
          </option>
          <option className="drop-options" value="Business Analyst">
            Business Analyst
          </option>
          <option className="drop-options" value="BI Developer">
            BI Developer
          </option>
          <option className="drop-options" value="Project Lead">
           Project Lead
          </option>
          <option className="drop-options" value="Summer Analyst">
            Summer Analyst
          </option>
          <option className="drop-options" value="Manager">
            Manager
          </option>
        </select>
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Department : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.Dept_Name}</p>
        <select className={`head-text ${edit?'content-editable':'content-editable-hidden'} `} defaultValue={current_emp.Dept_Name} onChange={event => setdept(event.target.value)}>
          <option className="drop-options" value="Select">Select</option>
          <option value="IT">IT</option>
          <option value="Human resources">Human Resources</option>
          <option value="MD">MD</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Skype ID : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.Skype_Id}</p>
        <input
          type="text"
          className={`head-text ${edit?'content-editable':'content-editable-hidden'} `}
          onChange={event => setskypeid(event.target.value)}
          defaultValue={current_emp.Skype_Id}
        />
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Email ID : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.Email_id}</p>
        <input
          type="text"
          className={`head-text ${edit?'content-editable':'content-editable-hidden'} `}
          onChange={event => setemial(event.target.value)}
          defaultValue={current_emp.Email_id}
        />
      </div>

      <div className="details-div">
        <p className="head-text desc"><b>Phone Number : </b></p>
        <p className={`head-text ${edit?'content-editable-hidden':'content position-relative'} `}>{current_emp.phone_no}</p>
        
         <input
          type="tel"
          className={`head-text ${edit?'content-editable':'content-editable-hidden'} `}
          onChange={event => setphno(event.target.value)}
          defaultValue={current_emp.phone_no}
        />
          
        
      </div>
      <p id="alert_msg" className="alert-text">{alert}</p>
      <div className="details-div">
        <button
          onClick={()=>{setedit(true)}}
          className={`button ${edit?' content-editable-hidden':'edit-btn'}`}
          style={{color: "white", backgroundColor: "#3399ff"}}
          
        >
          Edit Details
        </button>
        <button
          onClick={()=>{saveDetails()}}
          className={`button ${edit?'edit-btn':'content-editable-hidden'}`}
          style={{color: "white", backgroundColor: "#0b8300"}}
        >
          Save Details
        </button>
        <button onClick={()=>{deletes()}}>Delete Employee</button>

      </div>
    </div>
    }
    </>
  )
}

export default FullEmployee

