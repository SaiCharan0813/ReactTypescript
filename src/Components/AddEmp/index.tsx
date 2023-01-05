import {useState} from "react";
import {v4 as uuid} from "uuid";
import { Link } from "react-router-dom";
import '../AddEmp/style.css'
import pic from '../assets/employee-img2.jpg'
import Employee_dir from "../EmployeeDir";
interface props{
  closeEmp : any
}
import IEmployee from '../IEmployee/IEmployee';
var image_url:any
var file:string
function AddEmp( {closeEmp}:props) {
  // All the variable initialisation and usestate hooks declaration
  var employees: IEmployee[] = JSON.parse(
    localStorage.getItem("employees") || "[]"
  );

  var [emp_img, setemp_img] = useState<string>("");
  const [f_name, setf_name] = useState<string>("");
  const [l_name, setl_name] = useState<string>("");
  const [prfrd_name, setprfrd_name] = useState<string>(f_name+l_name);
  const [jobtitle, setjobtitle] = useState<string>("Select");
  const [office, setoffice] = useState<string>("Select");
  const [dept, setdept] = useState<string>("Select");
  const [skypeid, setskypeid] = useState<string>("");
  const [email, setemial] = useState<string>("");
  const [Phnno, setphno] = useState<string>("");
  const [alert, setalert] = useState<string>("");

  //Function to validate employee details from add employee form
  function validateEmp(): boolean {
    if (f_name.length == 0) {
      setalert("please enter your first name");
      return false;
    }
    if (l_name.length == 0) {
      setalert("please enter your last name");
      return false;
    }
    
    if (dept == "Select") {
      setalert("please select the department");
      return false;
    }
    if (jobtitle == "Select") {
      setalert("please select the job title");
      return false;
    }
    if (office == "Select") {
      setalert("please select the office");
      return false;
    }
    if (skypeid.length == 0) {
      setalert("please enter skypeid");
      return false;
    }
    if (Phnno.length != 12) {
      setalert("please enter the valid phone number");
      return false;
    }


    var x = email;
    var email_regex: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email_regex.test(x) == false) {
      setalert("Please enter a valid Email ID !");

      return false;
    }

    return true;
  }

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

  //Function to add a employee to the directory (local storage) if validated to be satisfying all the required criteria
  function addEmp(): void {
    let validate_res: boolean = validateEmp();
    if (validate_res){
      emp_img=image_url;
      var employee1: IEmployee = {
        _id: uuid().slice(0, 8),
        Employee_Img:emp_img,
        First_Name: f_name,
        Last_Name: l_name,
        Preffered_Name: prfrd_name,
        Title: jobtitle,
        Office_Details: office,
        Dept_Name: dept,
        Skype_Id: skypeid,
        Email_id: email,
        phone_no: Phnno,
        
      };
      employees.push(employee1);
      localStorage.setItem("employees", JSON.stringify(employees));
      window.alert(`New user ${f_name} was added`);
      
      //To set all the employee form fields to empty
      setf_name("");
      setl_name("");
      setprfrd_name(f_name+l_name);
      setjobtitle("Select");
      setoffice("Select");
      setdept("Select");
      setemial("");
      setphno("");

      //To dispatch an event to let know for employee directory that the local storage has been updated
      window.dispatchEvent(new Event("storage"));
    }
  }
  return (
    <div id="add-emp-list" className="add_emp">
      <button onClick={() => closeEmp(false)}>x</button>
      <h1 className="head-text2">ADD EMPLOYEE</h1>
      <form action="POST">
       
        <label htmlFor="select_img"><b>Select Image</b></label>
                <input type="file" className="form-control"  id="image-input" name="imageurl" onChange={()=>previewFile(event)} accept="image/jpeg, image/png, image/jpg"  />
       
        <label htmlFor="First_name" className="head-text3">First Name</label>
        <input type="text" name="First_name" className="emp-frm-elm" value={f_name}
          onChange={(event) => {
            setf_name(event.target.value);
          }}/>

        <label htmlFor="Last_name" className="head-text3" >Last Name</label>
        <input type="text" name="Last_name" className="emp-frm-elm" value={l_name}
          onChange={(event) => setl_name(event.target.value)}/>

        <label htmlFor="Prefrd_name" className="head-text3">Preferred Name</label>
        <input type="text" name="Prfrd_name" className="emp-frm-elm" value={f_name+l_name}
          onMouseOver={()=>setprfrd_name(f_name+l_name)} />

        <label htmlFor="Job_title" className="head-text3">Job Title</label>
        <select name="Job_title" id="jb-title" className="emp-frm-elm" value={jobtitle}
          onChange={(event)=>setjobtitle(event.target.value)} >
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

        <label htmlFor="Office" className="head-text3">Office</label>
        <select name="Office" id="office" className="emp-frm-elm" value={office}
          onChange={(event)=>setoffice(event.target.value)} >
          <option className="drop-options" value="Select">Select</option>
          <option value="Seattle">Seattle</option>
          <option value="India">India</option>
        </select>

        <label htmlFor="Dept" className="head-text3">Department</label>
        <select name="Dept" id="dept" className="emp-frm-elm" value={dept}
          onChange={(event)=>setdept(event.target.value)}>
          <option className="drop-options" value="Select">Select</option>
          <option value="IT">IT</option>
          <option value="Human resources">Human Resources</option>
          <option value="MD">MD</option>
          <option value="Sales">Sales</option>
        </select>

        <label htmlFor="Skype" className="head-text3">Skype ID</label>
        <input type="text" name="Skype" className="emp-frm-elm" value={skypeid}
          onChange={(event)=>setskypeid(event.target.value)} />
        <label htmlFor="Email" className="head-text3">Email</label>
        <input type="email" name="Email" className="emp-frm-elm" value={email}
          onChange={(event)=>setemial(event.target.value)} />
        <label htmlFor="Phn_no" className="head-text3">Phone No</label>
        <input
          type="tel"
          name="Phn_no"
          className="emp-frm-elm"
          pattern="[0-9]{2}[0-9]{10}"
          placeholder="91xxxxxxxxxx"
          value={Phnno}
          onChange={(event)=>setphno(event.target.value)}
        />
        <p id="alert-msg" className="alert-text3 font-family3">{alert}</p>
        <input
          type="button"
          className="button font-family3 add-emp-submit"
          onClick={()=>{
            addEmp()
          }}
          value="Add Employee"
        />
      </form>
    </div>
  )
}
export default AddEmp