pipeline {
    agent any
    tools{
        nodejs'node18'
    }

    stages {
        stage('git') {
            steps {
               git branch: 'main', url: 'https://github.com/venkatesh9691/Finance-DIT-Env.git' 
            }
        }
        stage("npm depend"){
            steps{
                sh'npm install'
            }
        }
        
        stage("build"){
            steps{
                sh'npm run build'
            }
        }
    }
}
