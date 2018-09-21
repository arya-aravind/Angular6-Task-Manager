const express = require('express');
const cors =require('cors');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const Issue  = require('./models/Issue');
const Admin_task = require('./models/Task');
const UserPassword=require('./models/User_pwd');

var app = express();
var router = express.Router();

app.use(cors());
global.__root   = __dirname + '/';
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/TaskManagment',{ useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/user/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/users').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('/users/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});
router.route('/users/auth/:email').get((req, res) => {
    UserPassword.findOne({ email: req.params.email}, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});

router.route('/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});
router.route('/user/update/:id').put((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load Document'));
        else {
              issue.email = req.body.email;
            issue.firstName = req.body.firstName;
            issue.lastName = req.body.lastName;
            
            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/user/delete/:id').delete((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

router.route('/user/assignTask').post((req, res) => {
    let issue = new Admin_task(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'task assigned to user successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to assign task to user ');
        });
});

router.route('/user/userpwd').post((req, res) => {
    let issue = new UserPassword(req.body);
            issue.user_id = req.body.user_id;
            issue.email = req.body.email;
            issue.password = req.body.pwd;
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'pwd assigned to user successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to assign user password');
        });
});



app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
