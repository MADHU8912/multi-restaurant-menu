pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/multi-restaurant-menu:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show Files') {
            steps {
                bat 'dir'
                bat 'dir backend'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_TOKEN')]) {
                    bat 'echo %DOCKERHUB_TOKEN% | docker login -u %DOCKERHUB_USERNAME% --password-stdin'
                }
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %IMAGE_NAME%'
            }
        }

        stage('Docker Pull') {
            steps {
                bat 'docker pull %IMAGE_NAME%'
            }
        }

        stage('Build Report') {
            steps {
                bat 'echo Pipeline success > build-report.txt'
                archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
            }
        }
    }

    post {
        failure {
            bat 'echo Pipeline failed > build-report.txt'
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
    }
}