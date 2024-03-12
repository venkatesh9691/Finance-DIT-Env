pipeline {
    agent any

  tools{
    jdk'jdk8'
    nodejs'node18'
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
                sh 'npm run build'
              }    
          }
        stage("publish"){
            steps{
                sh'npm publish '
            }
        }
      
    }
}
