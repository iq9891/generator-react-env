'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.red('generator-react-env') + ' generator!'
    ));

    var prompts = [
        {
          type: 'input',
          name: 'projectName',
          message: 'Please input project name (reactApp):',
          default: 'sudiyi_app'
        },{
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  defaults: function () {

    // if (path.basename(this.destinationPath()) !== this.props.projectName) {
    //   this.log(
    //     'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
    //     'I\'ll automatically create this folder.'
    //   );
    //   mkdirp(this.props.projectName);
    //   this.destinationRoot(this.destinationPath(this.props.projectName));
    // }

  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTpl({
      generatorName: 'generator-react-env',
      yoName: 'react-env'
    }));

    var pkg = this.fs.readJSON(this.templatePath('package_tmpl.json'), {});
    extend(pkg, {
      dependencies: {
        'aliyun-sdk': '^1.6.3'
      },
      devDependencies: {
        'mocha': '^2.3.3'
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('generator-react-env');

    pkg.name = this.props.projectName;
    // pkg.description = this.props.projectDesc;
    // pkg.main = this.props.projectMain;
    // pkg.author = this.props.projectAuthor;
    // pkg.license = this.props.projectLicense;

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);


  },

  install: function () {//是否自动安装
    // this.installDependencies();
  }
});
