

let editRow = null;


// ===============================
// Input Validation
// ===============================


// Student ID only numbers
document.getElementById("sid").addEventListener("input", function(){

    this.value = this.value.replace(/\D/g,"");

});



// Student Name only alphabets
document.getElementById("name").addEventListener("input", function(){

    this.value = this.value.replace(/[^A-Za-z ]/g,"");

});



// Mobile number only digits
document.getElementById("phone").addEventListener("input", function(){

    this.value = this.value.replace(/\D/g,"").slice(0,10);

});



// Pincode only digits
document.getElementById("pincode").addEventListener("input", function(){

    this.value = this.value.replace(/\D/g,"").slice(0,6);

});




// ===============================
// Form Submit
// ===============================


document.getElementById("studentForm")
.addEventListener("submit",function(e){


    e.preventDefault();



    let sid=document.getElementById("sid").value;

    let name=document.getElementById("name").value;

    let email=document.getElementById("email").value;


    let gender=document.querySelector(
        'input[name="gender"]:checked'
    ).value;


    let course=document.getElementById("course").value;


    let phone=document.getElementById("phone").value;


    let pincode=document.getElementById("pincode").value;


    let city=document.getElementById("city").value;


    let address=document.getElementById("address").value;



    let skills=[];


    document.querySelectorAll(".skills input:checked")
    .forEach(function(skill){

        skills.push(skill.value);

    });



    // Validation

    if(phone.length !== 10){

        alert("Mobile number must contain 10 digits");

        return;

    }



    if(pincode.length !== 6){

        alert("Pincode must contain 6 digits");

        return;

    }





    let imageFile=document.getElementById("image").files[0];



    function saveData(image){



        if(editRow==null){



            let table=document
            .querySelector("#studentTable tbody");



            let row=table.insertRow();



            row.innerHTML=`

            <td>${sid}</td>

            <td>
            <img src="${image}">
            </td>

            <td>${name}</td>

            <td>${email}</td>

            <td>${gender}</td>

            <td>${course}</td>

            <td>${skills.join(", ")}</td>

            <td>${phone}</td>

            <td>${pincode}</td>

            <td>${city}</td>

            <td>${address}</td>


            <td>

            <button class="view">
            View
            </button>


            <button class="edit">
            Edit
            </button>


            <button class="delete">
            Delete
            </button>


            </td>

            `;



            addEvents(row);


        }

        else{



            // Update edited information


            editRow.cells[0].innerHTML=sid;

            editRow.cells[1].innerHTML=
            `<img src="${image}">`;

            editRow.cells[2].innerHTML=name;

            editRow.cells[3].innerHTML=email;

            editRow.cells[4].innerHTML=gender;

            editRow.cells[5].innerHTML=course;

            editRow.cells[6].innerHTML=
            skills.join(", ");

            editRow.cells[7].innerHTML=phone;

            editRow.cells[8].innerHTML=pincode;

            editRow.cells[9].innerHTML=city;

            editRow.cells[10].innerHTML=address;



            editRow=null;


            document.getElementById("submitBtn").innerHTML=
            "Register Student";


        }



        document.getElementById("studentForm").reset();


    }





    if(imageFile){


        let reader=new FileReader();


        reader.onload=function(){


            saveData(reader.result);


        };


        reader.readAsDataURL(imageFile);


    }

    else{


        saveData(
            editRow.cells[1].querySelector("img").src
        );


    }



});






// ===============================
// Button Events
// ===============================


function addEvents(row){



// Delete

row.querySelector(".delete")
.onclick=function(){


    if(confirm("Delete this student?")){


        row.remove();


    }


};





// View

row.querySelector(".view")
.onclick=function(){


alert(

"Student ID : "+row.cells[0].innerHTML+

"\nName : "+row.cells[2].innerHTML+

"\nEmail : "+row.cells[3].innerHTML+

"\nGender : "+row.cells[4].innerHTML+

"\nCourse : "+row.cells[5].innerHTML+

"\nSkills : "+row.cells[6].innerHTML+

"\nMobile : "+row.cells[7].innerHTML+

"\nPincode : "+row.cells[8].innerHTML+

"\nCity : "+row.cells[9].innerHTML+

"\nAddress : "+row.cells[10].innerHTML


);


};






// Edit

row.querySelector(".edit")
.onclick=function(){



    editRow=row;



    document.getElementById("sid").value=
    row.cells[0].innerHTML;


    document.getElementById("name").value=
    row.cells[2].innerHTML;


    document.getElementById("email").value=
    row.cells[3].innerHTML;


    document.getElementById("course").value=
    row.cells[5].innerHTML;


    document.getElementById("phone").value=
    row.cells[7].innerHTML;


    document.getElementById("pincode").value=
    row.cells[8].innerHTML;


    document.getElementById("city").value=
    row.cells[9].innerHTML;


    document.getElementById("address").value=
    row.cells[10].innerHTML;



    let gender=row.cells[4].innerHTML;


    document.querySelector(
    `input[name="gender"][value="${gender}"]`
    ).checked=true;





    document.querySelectorAll(".skills input")
    .forEach(function(skill){


        skill.checked=false;


    });



    let oldSkills=row.cells[6]
    .innerHTML
    .split(", ");



    document.querySelectorAll(".skills input")
    .forEach(function(skill){


        if(oldSkills.includes(skill.value)){


            skill.checked=true;


        }


    });



    document.getElementById("submitBtn").innerHTML=
    "Update Student";



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



};



}






// ===============================
// Cancel Edit
// ===============================


document.getElementById("cancelBtn")
.onclick=function(){


    editRow=null;


    document.getElementById("studentForm").reset();


    document.getElementById("submitBtn").innerHTML=
    "Register Student";


};






// ===============================
// Search Function
// ===============================


document.getElementById("searchBtn")
.onclick=function(){



let value=document
.getElementById("search")
.value
.toLowerCase();



let rows=document
.querySelectorAll("#studentTable tbody tr");



rows.forEach(function(row){



let id=row.cells[0]
.innerHTML
.toLowerCase();



let name=row.cells[2]
.innerHTML
.toLowerCase();



if(id.includes(value) || name.includes(value)){


    row.style.display="";


}

else{


    row.style.display="none";


}



});


};