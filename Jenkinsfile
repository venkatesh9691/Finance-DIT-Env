pipeline {
    agent any

  tools{
    nodejs'node18'
  }

  environment= {
    NODEJS_HOME = 'C:\\Program Files\\nodejs\\'
  }
    stages {
        stage('git') {
            steps {
               git branch: 'main', url: 'https://github.com/venkatesh9691/Finance-DIT-Env.git' 
            }
        }
        stage("npm dependencies"){
            steps{
                sh'npm install'
            }
        }
        stage('Build') {
            steps {
              withEnv(['PATH+NODEJS=${NODEJS_HOME}']) {
                sh 'node --version'
              }    
            }
          }
        stage("publish"){
            steps{
                sh'npm publish '
            }
        }
      
    }
}
