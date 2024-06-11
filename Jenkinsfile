pipeline {
        environment {
        dotnetF = "clinivia_backend-master/clinivia_backend"
        angularF = "clinivia_frontend-master"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_cred_sipacademy2024')
                    }

          agent any
          stages {

          stage('Build Docker Image Backend') {
            steps {
                sh 'docker build -t sipacademy2024/clinivia_backend:latest ${dotnetF}'
            }
          }

          stage('Push Docker Image Backend') {
          steps {
              script {
            sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
            sh 'docker push sipacademy2024/clinivia_backend:latest'
        }
            }
           post {
             always {
            sh 'docker logout'
                    }
                }

          }

           stage('Build Docker Image Frontend') {
            steps {
                sh 'docker build -t sipacademy2024/clinivia_frontend:latest ${angularF}'
            }
          }

          stage('Push Docker Image Frontend') {
          steps {
              script {
            sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
            sh 'docker push sipacademy2024/clinivia_frontend:latest'
        }
            }
           post {
             always {
            sh 'docker logout'
                    }
                }

          }

          stage('Run Docker Compose') {
            steps {
                script {
                    sh "docker compose -f docker-compose.yaml up -d"
                }
            }
        }
       }
}
