pipeline {
    agent any

  tools{
    nodejs'node18'
  }
    stages {
        stage('git') {
            steps {
               git branch: 'main', url: 'http://16.171.59.12:8081/repository/venkatesh/' 
            }
        }
        stage("npm dependencies"){
            steps{
                sh'npm install'
            }
        }
        
        stage("publish"){
            steps{
                sh'npm publish '
            }
        }
      stage('Build') {
            steps {
                  sh'npm run build'
                }
            }
    }
}
