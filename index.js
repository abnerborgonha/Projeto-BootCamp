const express = require('express');

const server = express();

server.use(express.json());

let numberOfRequests = 0;
projects = [];

//   Middleware que checa se o projeto existe
 
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
  
    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }
  
    return next();
}


server.use((req, res, next) => {
    
    numberOfRequests ++

    console.time('Request');
    console.log(`Vezes que foi feito uma requisição: ${numberOfRequests}`);
    console.log(`Método: ${req.method}; URL: ${req.url}`);

    next(); 

    console.timeEnd('Request');
});



//  POST /projects
server.post('/projects', (req, res) => {
    const {id} = req.body;
    const {title} = req.body;
    const {tasks} = req.body;
    
    projects.push({id, title, tasks});

    return res.json(projects);
});

//  GET /projects
server.get('/projects', (req, res) => {
    return res.json(projects);
})

//  PUT /projects/:id
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    //FIND encontra um valor
    const project = projects.find(p => p.id == id);
  
    project.title = title;
  
    return res.json(project);
});

//  DELETE /projects/:id
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
  
    //FIND INDEX, encontra o indice do objeto dentro do array
    const projectIndex = projects.findIndex(p => p.id == id);
  
    projects.splice(projectIndex, 1);
  
    return res.send();
});

//  POST /projects/:id/tasks:
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(project);
});

server.listen(3030);