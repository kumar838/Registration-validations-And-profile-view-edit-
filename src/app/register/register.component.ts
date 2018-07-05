import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../Validators/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  contactForm: FormGroup;
  formType;
  editValue;
  name;
  Filesize: number = null;
  ItemImage: any = "";
  imagediv: boolean = false;
  //cntryname="";
  pandispaly: boolean = false;
  skillsarray: any[] = [];
  skillerror: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  //Disable Previous dates
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  // For checkbox Loop
  skills = [
    { name: "JAVA", value: "JAVA" },
    { name: "PHP", value: "PHP" },
    { name: "MYSQL", value: "MYSQL" },
    //  {name: "JAVASCRIPT",value:"JAVASCRIPT"},
    //  {name: "HTML",value:"HTML"},
    //  {name: "CSS",value:"CSS"},
    //  {name: "HADOOP",value:"HADOOP"},
    //  {name: "ANGULAR",value:"ANGULAR"},
    //  {name: "BOOSTRAP",value:"BOOSTRAP"}
  ];

  countries = ["india", "uk", "usa", "canada"];
  responceResult = [
    { name: "JAVA", value: "JAVA" },
    { name: "PHP", value: "PHP" },
    { name: "BOOSTRAP", value: "BOOSTRAP" }
  ];

  constructor(private frmbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

    this.formType = this.activatedRoute.snapshot.paramMap.get('edit');  // to get 'edit' in url 
    var res=localStorage.getItem("userDetails");
    
    if(res){    
    this.editValue=JSON.parse(res);
    console.log(this.editValue.name);
    }
    console.log(this.formType)

    if(this.formType == 'edit'){
      // this.contactForm = frmbuilder.group({
      //   name: new FormControl('', [Validators.required, Validators.minLength(6)])
      // })
      this.contactForm = frmbuilder.group({
        name: new FormControl(this.editValue.name, [Validators.required, Validators.minLength(6)]),
        email: new FormControl(this.editValue.email, [Validators.required, Validators.pattern(this.emailPattern)]),
        //email: new FormControl(this.editValue.name, [Validators.required, Validators.email]),  // for angular 4 default  Validators.email property
        mobile: new FormControl(this.editValue.mobile, [Validators.required, Validators.pattern("[0-9]*")]),
        country: new FormControl(this.editValue.country, [Validators.required]),
        gender: new FormControl(this.editValue.gender, [Validators.required]),
        //skillscontrol: this.frmbuilder.array(['JAVA','HADOOP']),  // (For default checked Values)
        skillscontrol: this.frmbuilder.array([this.editValue.skillsarray]),  
        birthday: new FormControl(this.editValue.birthday),
        subject: new FormControl(this.editValue.subject, [Validators.minLength(5), Validators.maxLength(15)]),
        message: new FormControl(this.editValue.message),
        pan: new FormControl(this.editValue.pan),
        pannum: new FormControl(this.editValue.pannum),
        item_image_size: new FormControl(this.editValue.item_image_size),
        item_image: new FormControl(null),
        agree: new FormControl('true', [Validators.required])
      })
      // this.contactForm.controls['name'].setValue(this.editValue.name);
    }else{
      this.contactForm = frmbuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(6)]),
        email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        //email: new FormControl('', [Validators.required, Validators.email]),  // for angular 4 default  Validators.email property
        mobile: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
        country: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        //skillscontrol: this.frmbuilder.array(['JAVA','HADOOP']),  // (For default checked Values)
        //skillscontrol: this.frmbuilder.array([]),                 // For default All values unchecked
        skillscontrol: this.frmbuilder.array(this.skills.map(() => this.frmbuilder.control('')), CustomValidators.multipleCheckboxRequireOne), // For checkboxvalidation atleast chk one checkbox
  
        birthday: new FormControl(),
        subject: new FormControl('', [Validators.minLength(5), Validators.maxLength(15)]),
        message: new FormControl(''),
        pan: new FormControl(''),
        pannum: new FormControl(''),
        item_image_size: new FormControl(''),
        item_image: new FormControl(null),
        agree: new FormControl('true', [Validators.required])
      });
    }

  }

  ngOnInit() {

  }

  postData(data)    // submit the form        -->  postData(data:NgForm)  -> console.log(data.controls); 
  {
    //console.log(data.controls); 
    console.log(data.name);
    console.log(Object.keys(data).length);
    var date = new Date();
    //data['date']=date; (or)    // Add Date to the Data json object
    data.date = date;         // Add Date to the Data json object
    localStorage.setItem("userDetails", JSON.stringify(data));    // for storing User information
    this.router.navigate(['/profileview'])
  }


  // For Checkbox
  isChecked(skill) {
    return this.contactForm.controls.skillscontrol.value.includes(skill);
  }

  onChange(skill: string, isChecked: boolean) {
    const skillsFormArray = <FormArray>this.contactForm.controls.skillscontrol;
    if (isChecked) {
      skillsFormArray.push(new FormControl(skill));
    } else {
      let index = skillsFormArray.controls.findIndex(x => x.value == skill)
      skillsFormArray.removeAt(index);
      console.log(isChecked);
      if (index) {
        this.skillerror = true;
      }
    }
  }

  // For Checkbox End


  //For file upload
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    //console.log(file.size);
    this.Filesize = file.size;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.ItemImage = myReader.result;
    }

    myReader.readAsDataURL(inputValue.files[0]);

    // for showing image div or not  Begin
    if (this.ItemImage != null) {
      this.imagediv = true;
    }
    // for showing image div or not End 

  }
  //For file upload End


  minMax(control: FormControl) {
    return parseInt(control.value) > 5 && parseInt(control.value) <= 20 ? null : {
      minMax: true
    }
  }


  // not allow Characters Validation
  notallowcharsvalidate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  //not Allow Numbers Validation
  notallownumsvalidate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[a-z,A-Z]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  panvalid(panval) {
    //console.log(panval);
    if (panval == 'yes') {
      this.pandispaly = true;
    }
    else {
      this.pandispaly = false;
    }
  }

  //For model popup
  onSubmitctry(data) {
    //console.log(this.countries.indexOf(data.addctry));
    if (this.countries.indexOf(data.addctry) == -1) {
      //console.log(data.addctry);
      this.countries.push(data.addctry);
    }
    else {
      alert("Country already Exist");
    }
  }


  reset() {
    //this.contactForm.controls['name'].setValue('');
    this.contactForm.reset();
  }


}
