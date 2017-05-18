const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const env = require('common-env')();
const loki = require('lokijs');
const uuid = require('uuid/v4');
const _ = require('lodash');
let app = express();

app.use(bodyParser.json());
app.use(fileUpload());

const config = env.getOrElseAll({
  db: {
    file: 'loki.json',
  },
  basedir: 'data',
  secret: 'changeMeInProductionOrYouWillBeFired',
});

const uploadDir = path.join(__dirname, config.basedir);

// Initialize the database
let db, projects;

const hydrate = () => {
  projects = db.getCollection('projects');
  if (projects === null) {
    projects = db.addCollection('projects');
  }
};

db = new loki(config.db.file, {
  autoload: true,
  autoloadCallback: hydrate,
  autosave: true,
});

function checkProject(req, res, next){
  const p = projects.findOne({id: req.params.id});
  if( p === null){
    res.sendStatus(404);
  } else {
    req.project = p;
    next();
  }
}

app.get('/projects', function listProjects(req,res){
  res.send(projects.find().map(p => ({id: p.id, metadata: p.metadata})));
});

app.post('/projects', function createProject(req, res){
  const newId = uuid();
  const p = projects.insertOne({id: newId, metadata: {name: newId}});
  mkdirp(path.join(uploadDir, newId));
  res.send(p);
});

app.get('/projects/:id', checkProject, function getProject(req, res){
  res.send(req.project);
});

app.put('/projects/:id', checkProject, function editProjectmetadatadata(req, res){
  const p =  _.assign(req.project, { metadata: _.assign({}, req.project.metadata, req.body)});
  res.send(projects.update(p));
});

app.delete('/projects/:id', checkProject, function deleteProject(req, res){
  projects.remove(req.project);
  rimraf(path.join(uploadDir, req.project.id), () => res.send());
});

app.post('/projects/:id/upload', checkProject, function uploadFile(req,res){
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  const uploaded = _.map(req.files, (file, name) => {
    const id = uuid();
    const filename = path.join(uploadDir, id);
    file.mv(filename);
    return ({uid: id, name: file.name, mimetype: file.mimetype, path: filename})
  });
  const oldFiles = req.project.files || [];
  const p = _.assign(req.project, { files: _.concat(oldFiles, uploaded) })
  res.send(projects.update(p));
});

app.get('/projects/:id/upload/:uid', checkProject, function viewUploadedFile(req,res){
  if(_.includes(_.map(req.project.files, 'uid') , req.params.uid)){
    const file = req.project.files.find({uid: req.params.uid});
    res.type(file.mimetype).sendFile(file.path);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/projects/:id/upload/:uid', checkProject, function deleteUploadedFile(req,res){
  if(_.includes(_.map(req.project.files, 'uid') , req.params.uid)){
    const file = req.project.files.find({uid: req.params.uid});
    const newFiles = _filter(req.project.files, f => f.id !== req.params.uid);
    const newProjects = _.assign({},req.project, {files: newFiles});
    projects.update(newProjects);
    rimraf(file.path, () => res.send());
  } else {
    res.sendStatus(404);
  }
});


app.listen(process.argv[2], function () {
  console.log(`Example app running`);
});

