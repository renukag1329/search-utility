pipeline {
    agent any
    
    stages{
        stage('SCM Checkout'){
            steps{
               git branch: 'main',
                   credentialsId: 'github',
                   url: 'https://github.com/renukag1329/search-utility.git'
                    
            }
        }
        stage('Test') {
            steps {
                sh "pwd"
                //sh "yum install git* -y"
                sh "git --version"
                //sh "apt-get install git* -y"
                //sh "git clone https://github.com/renukag1329/search-utility.git"
                 sh "pwd"
//sh "cd /var/lib/jenkins/workspace/search-utility"
  //               sh "cp .env.example .env"
    //             sh "npm install"
      //           sh "npm start"
            }
        }
        stage('Build Docker Image'){
            steps{
                
                sh "docker build -t renukag/search:$BUILD_NUMBER ."
            }
        }
        stage('Push Image to Docker Hub') {         
            steps{    
                withDockerRegistry([ credentialsId: "dockerhub", url: "" ]) {
                sh 'docker push renukag/search:$BUILD_NUMBER'  
                }
            
           }            
        }  
    }

}
