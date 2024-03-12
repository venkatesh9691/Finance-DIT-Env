pipeline {
    agent any
    tools{
        nodejs'node18'
    }

    stages {
        stage('git') {
            steps {
               git branch: 'main', url: 'https://github.com/RavindraSystima/Finance-DIT-Env.git' 
            }
        }
        stage("npm dependencies"){
            steps{
                sh'npm install'
            }
        }
        stage("build"){
            steps{
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
