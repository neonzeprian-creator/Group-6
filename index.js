import express from "express";

const students = [
    { id: 1, name: "Alice", age: 21, course: "Computer Science" },
    { id: 2, name: "Bob", age: 22, course: "Information Technology" }
];

const app = express();
app.use(express.json());

app.get("/student", (req, res) => {
    res.send(students);
});

app.get("/student/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const student = students.find((s) => s.id === id);
    if (!student) return res.status(404).send({ message: "Student not found" });
    res.send(student);
});

app.post("/student", (req, res) => {
    const { name, age, course } = req.body;
    if (!name) return res.status(400).send({ message: "Name is required" });
    const id = students.length ? students[students.length - 1].id + 1 : 1;
    const newStudent = { id, name, age, course };
    students.push(newStudent);
    res.status(201).send(newStudent);
});

app.patch("/student/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const student = students.find((s) => s.id === id);
    if (!student) return res.status(404).send({ message: "Student not found" });
    Object.assign(student, req.body);
    res.send(student);
});

// Delete a student
app.delete("/student/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return res.status(404).send({ message: "Student not found" });
    const removed = students.splice(index, 1)[0];
    res.send(removed);
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});