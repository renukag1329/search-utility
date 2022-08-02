pipeline {
    agent any
    environment
    {
        AWS_ACCOUNT_ID=”change here”
        //Assign your AWS Account Number here.
        AWS_DEFAULT_REGION=”change here”
        //Assign the region you created your ECS Cluster in
        CLUSTER_NAME=”change here”
        //Assign the name of the ECS Cluster that you created.
        SERVICE_NAME=”change here”
        //Assign the Service name that got created in the ECS Cluster.
        TASK_DEFINITION_NAME=”change here”
        //Assign the Task name that got created in the ECS Cluster.
        DESIRED_COUNT=”change here”
        //Assing the number of tasks you want to be created in the ECS Cluster.
        IMAGE_REPO_NAME=”change here”
        //Assign the ECR Repositoy URL
        IMAGE_TAG=”${env.BUILD_ID}”
        //Do not change this.
        REPOSITORY_URI = “${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}”
        //Do not change this.
        registryCredential = “change here”
        //Assign the name of the credentials you created in Jenkins to store the AWS Access Key and Secret Key

      }    
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
