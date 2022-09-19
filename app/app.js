function initListeners() {
  //function that turns the courses array into an HTML list
  function courseList(courses) {
    const newCourses = courses.map((course) => {
      return "<li>" + course + "</li>";
    });
    return newCourses.join("");
  }

  //function that retreives input values for first and last name on a click
  $("#submit").click((e) => {
    //prevent the browser from reloading??
    e.preventDefault();

    let allStudents = JSON.parse(localStorage.getItem("Student"));

    //retreive values
    let name = $("#name").val();
    let age = $("#age").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let classes = $("#classes").val().split(", "); //THIS WILL NEED ADJUSTED

    //if input was valid, create an object, add it to local storage, and clear input fields
    //if input was invalid, alert the user
    if (
      name != "" &&
      age != "" &&
      phone != "" &&
      email != "" &&
      classes != []
    ) {
      //create an object
      let studentObj = {
        name: name,
        age: age,
        phone: phone,
        email: email,
        classes: classes,
      };

      //add the object to an array of users
      allStudents.push(studentObj);

      //add object to local storage
      localStorage.setItem("Student", JSON.stringify(allStudents));
      console.log(localStorage.getItem("Student"));

      //clear input fields
      $("#name").val("");
      $("#age").val("");
      $("#phone").val("");
      $("#email").val("");
      $("#classes").val("");
    } else {
      alert("Please enter all input fields!");
    }
  });

  //function that ___ on a click
  $("#getStudents").click((e) => {
    e.preventDefault();
    //clear the area
    $("#app").html("");

    //get all names
    allStudents = JSON.parse(localStorage.getItem("Student"));
    console.log(allStudents);
    $.each(allStudents, function (idx, student) {
      $("#app").append(`
      <div class="card">
            <h2>${student.name}, ${student.age}</h2>
            <p>Phone: ${student.phone}</p>
            <p>email: ${student.email}</p>
            <h4>Class Schedule</h4>
            <ul>${courseList(student.classes)}</ul>
        </div>
      `);
    });
  });
}

function initSite() {
  if (localStorage) {
    let students = localStorage.getItem("Student");
    console.log(students);
    if (students) {
      console.log("yes");
      let studentsArray = JSON.parse(localStorage.getItem("Student"));
      console.log(studentsArray);
    } else {
      localStorage.setItem("Student", "[]");
      alert("No students have been added yet.");
    }
  } else {
    console.log("no local storage");
  }
}

$(document).ready(function () {
  initListeners();
  initSite();
});
