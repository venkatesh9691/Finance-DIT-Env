pipeline {
    agent any


  environment{
    node = "C:\Program Files\nodejs"
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
                withEnv(['PATH+NODEJS=${node}']) {
                  sh'npm run build'
                }
            }
        stage("publish"){
            steps{
                sh'npm publish '
            }
        }
    }
}
