
//   Table of Contents

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util")

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
function promptUser() {

  return inquirer.prompt([
    {
      type: "input",
      name: "Title",
      message: "What is the Title of the file?"
    },
    {
      type: "input",
      name: "Description",
      message: "What is in the file?"
    },

    {
      type: "input",
      name: "Installation",
      message: "How is the project installed?"
    },

    {
      type: "input",
      name: "Contributing",
      message: "What are the guidelines for contributing?"
    },

    {
      type: "input",
      name: "Tests",
      message: "Have you added a test?"
    },
    {
      type: "list",
      name: "license",
      message: "Does this project require a license?",
      choices: [
        "MIT",
        "Apache",
        "GNU",
        "No"
      ]
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub username?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },


  ])
};


// function to write README file 
function generateMarkDown(answers) {
return `
<a id ="return"></a>

# Table of Contents
1. [Title](#title)
2. [Description](#description)
3. [Installation](#installation)
4. [Contributing](#contributing)
5. [Test](#test)
6. [License](#license)
7. [Questions](#questions)



<a id ="title"></a>
# The title of the project is ${answers.Title} 

<a id ="description"></a>
# ${answers.Description} 

<a id ="installation"></a>
# The project is installed by ${answers.Installation} 

<a id ="contributing"></a>
# The guidelines are: ${answers.Contributing} 

<a id ="test"></a>
# Was a test added? ${answers.Tests} 

<a id="license"></a>
# Licence used : ${answers.license} 

<a id="questions"></a>
# Questions 
  * My GitHub username is <https://github.com/${answers.github}>
  * Please email me at ${answers.email} with anymore questions
 
  
  [Return to Top](#return)
 ` 



}

// function to initialize program
async function init() {
 
    try {
      
      const answers = await promptUser();
      
      // if (answers.license === "MIT") {
      //   answers.license = "https://img.shields.io/badge/MIT-License-red"
      // } else if (answers.licesne === "Apache") {
      //   answers.license = "https://img.shields.io/badge/Apache-License-yellow"
      // } else if (answers.license === "GNU") {
      //   answers.license = "https://img.shields.io/badge/GNU-License-green"
  
      // borrowed code from https://dillinger.io/

      const badges =  {
        'MIT': '[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)' ,
        'GNU':  '[![made-with-GNU](https://img.shields.io/badge/GNU-License-green)](https://www.gnu.org/software/bash/)',
        'Apache': '[![made-with-Apache](https://img.shields.io/badge/Apache-License-yellow)](https://www.apache.org/licenses/LICENSE-2.0.txt)'
      }
      
      answers.license = badges[answers.license]
      
      const md = generateMarkDown(answers);
     
      await writeFileAsync("README.md", md);

   

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }

}

// function call to initialize program
init();
