import express from "express";

const students = [{id:0, name: "students"}]
const app = express();

app.use(expres.json());

app.get("/students", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("The student with the given ID was not found.");
    res.send(student);
});

app.post("students", (req, res) => {
    const newStudent = req.body

    students = [students, newStudent];
    res.send(newStudents);
}); 

app.patch("/students/:inded", (req, res) => {
    const studentsIndex = req.params 
    const updatedStudentData = req.body

    students[studentsIndex] = updatedStudentData;
    
    res.send(students[studentsIndex]);
    //implement

});

app.delete("/students/:index",) 

//implement

app.listen(3000, () => {
    console.log("listening to port 3000");
})